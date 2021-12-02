import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import StepProgressBar from "./ProgressBar";
import { getOrder2, getUserDetails } from "../../functions/index";
import { useParams } from "react-router-dom";
import MapContainer from "../Map";

const ViewOrder = (props) => {
  const { userDetails, handleLogout } = props;
  const [order, setOrder] = useState({});
  const [store, setStore] = useState({});
  const { id } = useParams();
  let progress;

  useEffect(async () => {
    await getOrder2(id, setOrder);
  }, []);

  console.log(order);

  useEffect(async () => {
    if (order){
      await getUserDetails(order.store_email, setStore);

    }
  }, [order]);

  console.log(store);

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
            address={userDetails.location}
            address2={store.location}
            storeName={store.name}
            shelterName={userDetails.name}
            onClick={() => {
              console.log("clickled");
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
      </div>

      <div
        className="order-details"
        style={{
          margin: "3% auto",
          width: "60%",
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
    </div>
  );
};

export default ViewOrder;
