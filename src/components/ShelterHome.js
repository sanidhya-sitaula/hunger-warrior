import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Tax from "./Tax";
import History from "./History";
import Grid from "@mui/material/Grid";
import { getListings } from "../functions/index";
import MediaCard from "./Card";
import MediaCard2 from "./Card2";

const ShelterHome = (props) => {
  const { user, handleLogout, userDetails } = props;

  const [listings, setListings] = useState([{}]);
  useEffect(() => {
    getListings("", setListings);
  }, []);

  const displayListings = (listings, num_items) => {
    return listings.slice(0, num_items).map((listing) => {
      console.log(listing);
      return (
        <Grid
          item
          xs={3}
          style={{ display: "inline-flex", marginLeft: "10px" }}
        >
          <MediaCard
            name={listing.name}
            store_email={listing.store_email}
            available={listing.available}
            store_name={listing.store_name}
            quantity={listing.quantity}
            date_posted={listing.date}
          />
        </Grid>
      );
    });
  };

  return (
    <div className="hero" style={{ marginTop: "2%" }}>
      <Navbar
        user={user}
        userDetails={userDetails}
        handleLogout={handleLogout}
      />
      <div class="homepage-section">
        <h2 class="section-title">Ongoing Orders</h2>
        <div className="ongoing-orders">
          <div className="ongoing-orders-details">No ongoing orders</div>
        </div>
        <div className="border" />
      </div>

      <div class="homepage-section">
        <h2 class="section-title">Current Listings</h2>
        <Grid container spacing={2} style={{ marginTop: "2%" }}>
          <Grid item xs={9}>
            <div className="orders">
              {listings ? displayListings(listings, 2) : null}
              <Grid
                item
                xs={3}
                style={{ display: "inline-flex", marginLeft: "10px" }}
              >
                <MediaCard2 name="See All Listings..." />
              </Grid>
            </div>
          </Grid>
        </Grid>
        <div className="border" />
      </div>
      <div class="homepage-section">
        <h2 class="section-title">Add Request</h2>
        <div className="border" />
      </div>

      <div class="homepage-section">
        <h2 class="section-title">History</h2>
        <div className="listings"></div>
        <div className="border" />
      </div>
    </div>
  );
};

export default ShelterHome;
