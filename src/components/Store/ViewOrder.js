import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import StepProgressBar from "../Shelter/ProgressBar";
import {
  getOrder2,
  getUserDetails,
  handleStatusChange,
  handleStatusChange2,
} from "../../functions/index";
import { useParams } from "react-router-dom";
import MapContainer from "../Map";

export const ViewOrder = (props) => {
  const { userDetails, handleLogout } = props;
  const [order, setOrder] = useState({});
  const [shelter, setShelter] = useState({});
  const [request_status, setRequest_status] = useState("");

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
            address={userDetails.location}
            address2={shelter.location}
            storeName={order.store_name}
            shelterName={shelter.name}
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

      <div
        className="order-details"
        style={{
          margin: "3% auto",
          width: "60%",
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
    </div>
  );
};
