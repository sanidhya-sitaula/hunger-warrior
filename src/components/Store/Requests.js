import React from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "./Card";
import MediaCard2 from "./Card2";
import { Link } from "react-router-dom";

export let displayRequests = () => {}; 

const Requests = (props) => {
  const { requests, handleDeleteRequest } = props;

  displayRequests = (req, num_items="") => {
    if (num_items === ""){
      num_items = req.length
    }

    return requests.slice(0, num_items).map((request) => {
     const requestLink = `/viewrequest/${request.id}`;
      return (
        <Grid
          item
          xs={3}
          style={{ display: "inline-flex", marginRight: "10px" }}
          key = {request.id}
        >
        <Link className = "orderLink" to = {requestLink}>
            <MediaCard
                name={request.item_name}
                store_email={request.store_email}
                store_name={request.store_name}
                shelter_name = {request.shelter_name}
                quantity={request.item_quantity}
                status={request.request_status}
                available="Not Applicable"
                id={request.id}
                request_date={request.request_date}
                type="request"
            />
        </Link>
        
        </Grid>
      );
    });
  };

  return (
    <div class="homepage-section">
      <h2 class="section-title">Received Requests</h2>
      <div className="current_requests">
        {requests ? displayRequests(requests, 3) : null}
        <Grid item xs={3} style={{ display: "inline-flex" }}>
          <Link to="/allRequests" style={{ textDecoration: "None" }}>
            <MediaCard2 name="See All Requests..." icon="view_all" type = "requests"/>
          </Link>
        </Grid>
      </div>
      <div className="border" />
    </div>
  );
};

export default Requests;
