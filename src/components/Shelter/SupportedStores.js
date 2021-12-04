import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const SupportedStores = (props) => {
  const { stores } = props;
  const displayStores = () => {
    return stores.map((store) => {
      let profileLink = `/profile/${store.email}`
      let listingsLink = `${profileLink}#listings-from-store`
      return (
        <Grid item xs={6}>
          <div className="store_information">
            <div className="store_picture">
              <img width="100%" height="300" src={store.image}></img>
            </div>
            <h2 className="store_title">{store.name}</h2>
            <p className="store_location">{store.location}</p>
            <p className="store_phone">{store.phone}</p>
            <div className="store_information_buttons">
              <Link className="store_links_1" to = {listingsLink}>View Listings</Link>
              <Link className="store_links_2" to = {profileLink}>Store Profile</Link>
            </div>
          </div>
        </Grid>
      );
    });
  };

  return (
    <div class="homepage-section">
      <h2 class="section-title">Stores Currently Supported</h2>
      <Grid container spacing={2}>
        {displayStores()}
      </Grid>
      <div className="border" />
    </div>
  );
};

export default SupportedStores;
