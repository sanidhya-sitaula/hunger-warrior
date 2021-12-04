import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import StepProgressBar from "../Shelter/ProgressBar";
import {
  getOrder2,
  getUserDetails,
  handleStatusChange,
  handleStatusChange2,
  handleDelivererStatusChange
} from "../../functions/index";
import { useParams } from "react-router-dom";
import MapContainer from "../Map";
import {Grid} from '@material-ui/core'; 
import TextField from "@mui/material/TextField";


export const ViewOrder = (props) => {
  const { userDetails, handleLogout } = props;
  const [order, setOrder] = useState({});
  const [shelter, setShelter] = useState({});
  const [request_status, setRequest_status] = useState("");
  const [delivererName, setDelivererName] = useState("");
  const [delivererPhone, setDelivererPhone] = useState("");

  const { id } = useParams();

  let progress;

  const nextRequestStatus = (current_request_status) => {
    if (current_request_status === "Order Sent") {
      setRequest_status("Shipped");
    } else if (current_request_status === "Shipped") {
      setRequest_status("Delivered");
    }
  };

  const handleOnClick = async () => {
    await handleStatusChange2(id, request_status);
    await getOrder2(id, setOrder);
  };

  const handleSubmit = async () => {
      await handleDelivererStatusChange(id, delivererName, delivererPhone); 
      await getOrder2(id, setOrder); 
  }

  useEffect(async () => {
    await getOrder2(id, setOrder);
  }, [request_status]);

  useEffect(async () => {
    await getUserDetails(order.ordered_by, setShelter);
    nextRequestStatus(order.order_status);
  }, [order]);

  const calculateProgress = () => {
    if (order) {
      if (order.order_status === "Order Sent") {
        progress = 25;
      } else if (order.order_status  === "Shipped") {
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
        {shelter.location && order ? (
          <MapContainer
            latlng1 = {{'latitude' : userDetails.latitude, 'longitude' : userDetails.longitude}}
            latlng2 = {{'latitude' : shelter.latitude, 'longitude' : shelter.longitude}}
            storeName={order.store_name}
            shelterName={shelter.name}
            onClick={() => {
            }}
          />
        ) : (
          <h2>Loading Maps...</h2>
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

        <div className="buttons" style={{ marginTop: "5%" }}>
          {order.order_status !== "Delivered" ? (
            <button
              onClick={() => {
                handleOnClick();
              }}
              className="mark-as-button"
            >
              Mark as {request_status}
            </button>
          ) : null}
        </div>
      </div>

      <Grid container spacing = {6}>
        <Grid item xs = {7}>
          <div
            className="order-details"
            style={{
              margin: "3% auto",
              width: "100%",
              background: `linear-gradient( rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78) ),url(${
                shelter ? (shelter.image ? shelter.image : null) : null
              })`,
            }}
          >
            <h2 className="order-listing-title">{order.name}</h2>
            <h3 className="order-listing-title2">
              {shelter ? shelter.name : "Loading..."}
            </h3>
            <h4 className="order-listing-details">
              Shelter Email : {shelter ? shelter.email : "Loading..."}
            </h4>
            <h4 className="order-listing-details">
              Shelter Phone : {shelter ? shelter.phone : "Loading..."}
            </h4>
            <h4 className="order-listing-details">
              Shelter Location : {shelter ? shelter.location : "Loading..."}
            </h4>
            <h5 className="order-listing-details">Quantity : {order.quantity}</h5>
          </div>
        </Grid>
        <Grid item xs = {5}>


          <div className = "store_information" style = {{margin : '3% auto'}}>

            {order.deliverer_name && order.deliverer_phone ?
            <> 
            <div className = "icon-pic"><img src = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" height = '220px' /></div>
            <h2 className = "">Delivery By:</h2>
            <h4 className = "">{order.deliverer_name ? order.deliverer_name : 'TBD'}</h4>
            <h4 className = "">Contact : {order.deliverer_name ? order.deliverer_phone : 'TBD'}</h4>
            </>
           : 
           
           <ul className="new-request-form-items">
              <li>
                <TextField
                  required
                  id="outlined-required"
                  label="Deliverer Name"
                  defaultValue=""
                  style={{ width: "600px", marginBottom : '2%' }}
                  onChange = {(e) => setDelivererName(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  required
                  id="outlined-required"
                  label="Deliverer Phone"
                  defaultValue=""
                  style={{ width: "600px", marginBottom: '2%'}}
                  onChange = {(e) => setDelivererPhone(e.target.value)}
                />
              </li>
              <li>
              <button onClick = {() => handleSubmit()} style = {{width : "600px", backgroundColor : "rgb(23, 122, 135)", marginBottom:"2%"}}>Assign Deliverer</button>
            </li>
            </ul>

           }

              
            </div>
        </Grid>
        
      </Grid>

      
    </div>
  );
};
