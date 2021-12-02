import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getOrder2, getOrders2, getUserDetails } from "../../functions/index";
import { useParams } from "react-router-dom";
import MapContainer from "../Map";
import Grid from "@mui/material/Grid";
import {getAllListings2} from '../../functions/index'; 
import BasicTable from '../Table';
import MediaCard2 from "../Shelter/Card2";
import {Link} from 'react-router-dom';

const Profile = (props) => {
    const { email } = useParams();
    const { userDetails } = props; 
    const [storeDetails, setStoreDetails] = useState({})
    const [listings, setListings] = useState({})
    const [orders, setOrders] = useState({}) 

    const formatListings = (listings) => {
        let arr = []; 
        for (const [key, value] of Object.entries(listings)) {
          arr.push(value)
        }
    
        return arr; 
      }


    const filterOrders = (orders) => {
        let orders_with_store = []; 

        orders.map(order => {
            if (order.store_email == storeDetails.email){
                orders_with_store.push(order)
            }
        })

        return orders_with_store; 
    }

    useEffect(async () => {
        await getUserDetails(email, setStoreDetails);
        if (storeDetails){
            await getAllListings2(storeDetails.email, setListings)
        }
        if (storeDetails){
            await getOrders2(userDetails.email, setOrders)
        }
    }, [storeDetails])

    
    return (
        <div className = "hero">
            <Navbar />
            {storeDetails && storeDetails.location ? 
            <div>
            <h1 className = "section-title" style = {{marginBottom : '2%'}}>{storeDetails.name}</h1>
            <Grid container spacing = {8}>
                <Grid item xs = {9}>
                    <div>
                        <img width = '100%' height = "500" src = {storeDetails.image} />
                    </div>
                </Grid>

                <Grid item xs = {3}>
                <div className = "profile-map" style = {{}}>
                        <MapContainer
                            address={storeDetails.location}
                            storeName={storeDetails.name}
                            width='100%'
                        />
                </div>
                </Grid>
              </Grid>
              <Grid container spacing = {8} style = {{marginBottom: '2.5%'}}>
                  <Grid item xs = {9}>
                    <h2 className = "section-title" style = {{marginBottom : '2%'}}>Available Listings From {storeDetails.name}</h2>
                    {listings && Object.keys(listings).length > 0 ? <BasicTable columns = {['Quantity', 'View Details']} rows = {formatListings(listings)}/> : 'No Listings Available'}
                  </Grid>
                  <Grid item xs = {3}>
                      <div className = "store_information" style = {{height : '100%'}}>
                          <h2 className = "section-title" style = {{marginBottom: '20px'}}>Store Details</h2>
                          <p style = {{marginBottom : '10px'}}>Email: <span style = {{fontWeight : 'bold'}}>{storeDetails.email}</span></p>
                          <p style = {{marginBottom : '10px'}}>Phone: {storeDetails.phone}</p>
                          <p style = {{marginBottom : '10px'}}>Address: {storeDetails.location}</p>
                      </div>
                  </Grid>
              </Grid>

              <Grid container spacing = {8} style ={{marginBottom : '4%'}}>
                  <Grid item xs = {9}>
                      <h2 className = "section-title" style = {{marginBottom: '2%'}}>Order History</h2>
                        {orders && orders.length > 0 ? <BasicTable columns = {['Quantity', 'Order Date', 'Status', 'View Details']} rows = {filterOrders(orders)} /> : "No order history."}
                  </Grid>
                  <Grid item xs = {3}>
                  <Link to="/request" style={{ textDecoration: "None", textAlign: 'center'}} >
                        <MediaCard2 width = '100%' name={`Send a Request for an Item`} icon="plus" />
                  </Link>
                  </Grid>
              </Grid>

         </div>
        : null}
        </div>
    )
}

export default Profile; 