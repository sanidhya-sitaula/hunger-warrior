import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  deleteListing2,
  getAllListings2,
  getRequests2,
  getOrders2,
} from "../../functions/index";
import Footer from "../Footer";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Orders from './Orders'; 
import Listings from "./Listings";
import Requests from "./Requests";
import SheltersMap from './SheltersMap';

export let displayListings = () => {};

const ShelterHome = (props) => {
  const { user, handleLogout, userDetails, shelters } = props;
  const [orders, setOrders] = useState([{}]);
  const [listings, setListings] = useState([{}]);
  const [requests, setRequests] = useState([]);

  useEffect(async () => {
    await getAllListings2(userDetails.email, setListings);
    await getRequests2(userDetails.email, setRequests);
    await getOrders2(userDetails.email, setOrders, 'Store');
  }, []);


  const handleListingDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')){
        deleteListing2(id); 
        await getAllListings2(userDetails.email, setListings); 
    }
  }

  return (
    <div className="hero" style={{ marginTop: "2%" }}>
      <Navbar
        user={user}
        userDetails={userDetails}
        handleLogout={handleLogout}
      />
     <div className = "banner-after-nav">
          <h1 className = "banner-title">Welcome, {userDetails.name}!</h1>
          <div className = "quote" style = {{display : 'inline-flex'}}>
            <FormatQuoteIcon />
            <h4 className = "banner-quote">Hunger is not an issue of charity. It's an issue of Justice.</h4>
            <FormatQuoteIcon />
            </div>
      </div>
      <Orders orders = {orders}/>
      <Listings listings = {listings} handleDelete = {handleListingDelete}/>
      <Requests requests = {requests} />
      <SheltersMap userDetails = {userDetails} shelters = {shelters} />
      <Footer />
    </div>
  );
};

export default ShelterHome;
