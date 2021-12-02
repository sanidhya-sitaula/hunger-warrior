import React from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "./Card";
import MediaCard2 from "./Card2";
import { Link } from "react-router-dom";

export let displayRequests = () => {};

const Requests = (props) => {
  const { requests, handleDeleteRequest } = props;

  displayRequests = (req, num_items = "") => {
    if (num_items == ""){
      num_items = requests.length
    }
    console.log('requests in dispaly: ', req);
    return requests.slice(0, num_items).map((request) => {
      
      return (
        <Grid
          item
          xs={3}
          style={{ display: "inline-flex", marginRight: "10px" }}
        >
          <MediaCard
            name={request.item_name}
            store_email={request.store_email}
            store_name={request.store_name}
            quantity={request.item_quantity}
            request_status={request.request_status}
            available="Not Applicable"
            id={request.id}
            request_date={request.request_date}
            handleDelete={handleDeleteRequest}
            type="request"
          />
        </Grid>
      );
    });
  };

  return (
    <div class="homepage-section">
      <h2 class="section-title">Current Requests</h2>
      <div className="current_requests">
        {requests ? displayRequests(requests, 3) : null}
        <Grid item xs={3} style={{ display: "inline-flex" }}>
        <Link to="/allRequests" style={{ textDecoration: "None" }}>
            <MediaCard2 name="See All Requests..." icon="view_all" />
          </Link>
          <Link to="/request" style={{ textDecoration: "None" }}>
            <MediaCard2 name="Make a New Request..." icon="plus" />
          </Link>
        </Grid>
      </div>
      <div className="border" />
    </div>
  );
};

export default Requests;
