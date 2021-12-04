import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import StepProgressBar from "./ProgressBar";
import { getOrder2, getUserDetails } from "../../functions/index";
import { useParams } from "react-router-dom";
import MapContainer from "../Map";
import {Grid} from '@material-ui/core';

const ViewOrder = (props) => {
  const { userDetails, handleLogout } = props;
  const [order, setOrder] = useState({});
  const [store, setStore] = useState({});
  const { id } = useParams();
  let progress;

  useEffect(async () => {
    await getOrder2(id, setOrder);
  }, []);


  useEffect(async () => {
    if (order){
      await getUserDetails(order.store_email, setStore);

    }
  }, [order]);


  const calculateProgress = () => {
    if (order) {
      if (order.order_status === "Order Sent") {
        progress = 25;
      } else if (order.order_status === "Shipped") {
        progress = 75;
      } else if (order.order_status === "Delivered") {
        progress = 100;
      } else {
        progress = 0;
      }
    }
  };

  return (
    <div className="hero">
      <Navbar handleLogout={handleLogout} />
      
      <h1 className="section-title">Order Details</h1>
      <div className="map-view-order">
        {store.location && order ? (

          <MapContainer
            latlng1 = {{'latitude' : userDetails.latitude, 'longitude' : userDetails.longitude}}
            latlng2 = {{'latitude' : store.latitude, 'longitude' : store.longitude}}
            storeName={store.name}
            shelterName={userDetails.name}
            onClick={() => {
            }}
          />
        ) : (
         null
        )}
      </div>

      <div className="progress-bar">
        {calculateProgress()}

        <StepProgressBar progress={progress} />

        <div
          className="progressbar-labels"
          style={{ display: "inline-flex", marginTop: "4%" }}
        >
          <p className="progressbar-label progressbar-label1">Ordered</p>
          <p className="progressbar-label progressbar-label2">Shipped</p>
          <p className="progressbar-label progressbar-label3">Delivered</p>
        </div>
      </div>
      
        <Grid container spacing = {2}>
          <Grid item xs = {8}>
            <div
              className="order-details"
              style={{
                margin: "3% auto",
                width: "100%",
                background: `linear-gradient( rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78) ),url(${
                  store ? store.image : null
                })`,
              }}
            >
              <h2 className="order-listing-title">{order.name}</h2>
              <h3 className="order-listing-title2">
                {store ? store.name : "Loading..."}
              </h3>
              <h4 className="order-listing-details">
                Store Email : {store ? store.email : "Loading..."}
              </h4>
              <h4 className="order-listing-details">
                Store Phone : {store ? store.phone : "Loading..."}
              </h4>
              <h4 className="order-listing-details">
                Store Location : {store ? store.location : "Loading..."}
              </h4>
              <h5 className="order-listing-details">Quantity : {order.quantity}</h5>
            </div>
          </Grid>
          <Grid item xs = {4}>
            <div className = "store_information" style = {{margin : '6% auto'}}>
              <div className = "icon-pic"><img src = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" height = '230px' /></div>
              <h2 className = "">Delivery By:</h2>
              <h4 className = "">{order.deliverer_name ? order.deliverer_name : 'TBD'}</h4>
              <h4 className = "">Contact : {order.deliverer_name ? order.deliverer_phone : 'TBD'}</h4>
            </div>
          </Grid>
        </Grid>
      
    </div>
  );
};

export default ViewOrder;
