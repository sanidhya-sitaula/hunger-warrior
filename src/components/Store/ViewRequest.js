import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getRequestById2,
  handleNewOrder2,
  handleRequestStatusChange2,
} from "../../functions/index";
import Navbar from "../Navbar";


const ViewRequest = (props) => {
  const { id } = useParams();
  const { handleLogout, userDetails } = props;
  const [request, setRequest] = useState({});
  const history = useHistory();

  useEffect(() => {
    getRequestById2(id, setRequest);
  }, []);

  const handleConfirm = async () => {
    const newOrder = {
      date: new Date(),
      name: request.item_name,
      order_status: "Order Sent",
      ordered_by: request.shelter_email,
      item_value : parseFloat(request.item_value), 
      ordered_date: new Date(),
      quantity: request.item_quantity,
      shelter_name: request.shelter_name,
      store_email: userDetails.email,
      store_name: userDetails.name,
    };

    await handleNewOrder2(newOrder);
    await handleRequestStatusChange2(id, "Request Accepted");
  

    history.push("/");
  };

  const handleDecline = async () => {
    await handleRequestStatusChange2(id, "Request Declined");
    history.push("/");
  };

  return (
    <div className="hero">
      <Navbar handleLogout={handleLogout} />
      <h1 className="section-title">Request Details</h1>
      <div
        className="order-details"
        style={{
          margin: "3% auto",
          width: "60%",
          background: `linear-gradient( rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78) ),url()`,
        }}
      >
        <h2 className="order-listing-title">{request.item_name}</h2>
        <h3 className="order-listing-title2">
          {request ? request.shelter_name : "Loading..."}
        </h3>
        <h4 className="order-listing-details">
          Shelter Email : {request ? request.shelter_email : "Loading..."}
        </h4>
        <h4 className="order-listing-details">
          Request Date :{" "}
          {request && request.request_date
            ? request.request_date.slice(0,10)
            : "Loading..."}
        </h4>
        <h4 className="order-listing-details">
          Request Status : {request.request_status}
        </h4>
        <h5 className="order-listing-details">
          Quantity : {request.item_quantity}
        </h5>
        
      </div>
      {request.request_status !== "Request Accepted" ? 
     
          <>
        
        {/* <div className = "" style = {{margin : '0 auto'}}>
        <TextField
              required
              id="outlined-required"
              label="Value in Dollars"
              defaultValue=""
              style={{ width: "60%", margin : '0 20%'}}
              onChange={(e) => setItemValue(e.target.value)}
            />
          <p style = {{textAlign: 'center', margin : '2% auto'}}>*You need to mention the dollar value of the item before accepting just in order for it to register it for your Financial History. The item is still considered donated for free.</p>
          </div> */}
          <div
        className="store_information_buttons"
        style={{ width: "40%", margin: "0 30%" }}
      >
        <button
        className="store_information_btn"
        onClick={() => {
          handleConfirm();
        }}
      >
        Accept Request
      </button>
      <button
        className="store_information_btn"
        onClick={() => {
          handleDecline();
        }}
      >
        Decline Request
      </button>
      </div>
      </>

      : null}
        
    </div>
  );
};

export default ViewRequest;
