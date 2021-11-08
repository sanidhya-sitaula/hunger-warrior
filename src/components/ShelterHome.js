import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import {
  getListings,
  getShelterRequests,
  deleteRequest,
} from "../functions/index";
import MediaCard from "./Card";
import MediaCard2 from "./Card2";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import useForceUpdate from "use-force-update";

export let displayListings = () => {};

const ShelterHome = (props) => {
  const { user, handleLogout, userDetails, stores } = props;
  const [listings, setListings] = useState([{}]);
  const [requests, setRequests] = useState([]);
  const forceUpdate = useForceUpdate();

  useEffect(async () => {
    await getListings("", setListings);
    await getShelterRequests(userDetails.email, setRequests);
  }, []);

  const handleDeleteRequest = async (id) => {
    deleteRequest(id);
    await getShelterRequests(userDetails.email, setRequests);
  };

  const displayStores = () => {
    return stores.map((store) => {
      console.log(store);
      return (
        <Grid item xs={6}>
          <div className="store_information">
            <div className="store_picture">
              <img width="100%" height="300" src={store.store_image}></img>
            </div>
            <h2 className="store_title">{store.store_name}</h2>
            <p className="store_location">{store.store_location}</p>
            <p className="store_phone">{store.store_phone}</p>
            <div className="store_information_buttons">
              <button className="store_information_btn">View Listings</button>
              <button className="store_information_btn">Store Profile</button>
            </div>
          </div>
        </Grid>
      );
    });
  };

  const displayRequests = () => {
    console.log("REQUESTS: ", requests);

    return requests.map((request) => {
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
            handleDelete={handleDeleteRequest}
          />
        </Grid>
      );
    });
  };

  displayListings = (listings, num_items = "") => {
    if (num_items === "") {
      num_items = listings.length;
    }
    return listings.slice(0, num_items).map((listing) => {
      return (
        <Grid
          item
          xs={3}
          style={{ display: "inline-flex", marginRight: "10px" }}
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
          <div className="ongoing-orders-details">
            No ongoing orders. Order an item from the available listings below.
          </div>
        </div>
        <div className="border" />
      </div>

      <div class="homepage-section">
        <h2 class="section-title">Current Listings</h2>
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
                  <MediaCard2 name="See All Listings..." icon="view_all" />
                </Link>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <div className="border" />
      </div>

      <div class="homepage-section">
        <h2 class="section-title">Current Requests</h2>
        <div className="current_requests">
          {requests ? displayRequests() : null}
          <Grid item xs={3} style={{ display: "inline-flex" }}>
            <Link to="/request" style={{ textDecoration: "None" }}>
              <MediaCard2 name="Make a New Request..." icon="plus" />
            </Link>
          </Grid>
        </div>
        <div className="border" />
      </div>
      <div class="homepage-section">
        <h2 class="section-title">Stores Currently Supported</h2>
        <Grid container spacing={2}>
          {displayStores()}
        </Grid>
        <div className="border" />
      </div>

      <Footer />
    </div>
  );
};

export default ShelterHome;
