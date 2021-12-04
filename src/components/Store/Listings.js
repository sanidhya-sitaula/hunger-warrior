import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import MediaCard from "./Card";
import MediaCard2 from "./Card2";

export let displayListings = () => {};

const Listings = (props) => {
  const { listings, handleDelete } = props;

  const formatListings = (listings) => {
    let arr = []; 
    for (const [key, value] of Object.entries(listings)) {
      arr.push(value)
    }

    return arr; 
  }


  displayListings = (listings, num_items = "") => {
    listings = formatListings(listings);
    if (num_items === "") {
      num_items = listings.length;
    }
    return listings.slice(0, num_items).map((listing) => {
      return (
        <Grid
          item
          xs={3}
          style={{ display: "inline-flex", marginRight: "10px" }}
          key = {listing.id}
        >
        
          <MediaCard
            name={listing.name}
            store_email={listing.store_email}
            available={listing.available}
            store_name={listing.store_name}
            quantity={listing.quantity}
            date_posted={listing.date}
            id={listing.id}
            type="listing"
            role="Store"
            handleDelete = {handleDelete}
          />
        </Grid>
      );
    });
  };

  return (
    <div class="homepage-section">
      <h2 class="section-title">Your Current Listings</h2>
      <Grid container spacing={2} style={{ marginTop: "2%" }}>
        <Grid item xs={9}>
          <div className="orders">
            {listings ? displayListings(listings, 3) : null}
            <Grid
              item
              xs={3}
              style={{ display: "inline-flex", marginLeft: "10px" }}
            >
              <Link to="/listings" style={{ textDecoration: "None" }}>
                <MediaCard2 name="See All Listings..." icon="view_all" type = "listings" />
              </Link>
            </Grid>
            <Grid
              item
              xs={3}
              style={{ display: "inline-flex", marginLeft: "10px" }}
            >
              <Link to="/newlisting" style={{ textDecoration: "None" }}>
                <MediaCard2 name="Create New Listing..." icon="add" type = "listings" />
              </Link>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className="border" />
    </div>
  );
};

export default Listings;
