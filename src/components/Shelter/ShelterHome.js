import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  deleteRequest2,
  getAllListings2,
  getOrders2,
  getRequests2
} from "../../functions/index";
import Footer from "../Footer";
import SupportedStores from "./SupportedStores";
import Listings from "./Listings";
import Requests from "./Requests";
import Orders from "./Orders";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export let displayListings = () => {};

const ShelterHome = (props) => {
  const { user, handleLogout, userDetails, stores } = props;
  const [orders, setOrders] = useState([{}]);
  const [listings, setListings] = useState([{}]);
  const [requests, setRequests] = useState([]);

  useEffect(async () => {
    await getAllListings2("", setListings);
    await getRequests2(userDetails.email, setRequests);
    await getOrders2(userDetails.email, setOrders);
  }, []);

  const handleDeleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      deleteRequest2(id);
      await getRequests2(userDetails.email, setRequests);
    }
  };

  return (
    <div className="hero" style={{ marginTop: "2%" }}>
      <Navbar
        user={user}
        userDetails={userDetails}
        handleLogout={handleLogout}
      />
      <div className="banner-after-nav">
        <h1 className="banner-title">Welcome, {userDetails.name}!</h1>
        <div className="quote" style={{ display: "inline-flex" }}>
          <FormatQuoteIcon />
          <h4 className="banner-quote">
            Hunger is not an issue of charity. It's an issue of Justice.
          </h4>
          <FormatQuoteIcon />
        </div>
      </div>
      <Orders orders={orders} />
      <Listings listings={listings} />
      <Requests requests={requests} handleDeleteRequest={handleDeleteRequest} />
      <SupportedStores stores={stores} />
      <Footer />
    </div>
  );
};

export default ShelterHome;
