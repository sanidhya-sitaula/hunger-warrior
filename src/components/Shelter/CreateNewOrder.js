import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import {
  getListingById2,
  getUserDetails,
  handleNewOrder2,
} from "../../functions/index";
import MapContainer from "../Map";

const CreateNewOrder = (props) => {
  const history = useHistory();

  const { handleLogout, userDetails } = props;
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [store, setStore] = useState({});

  useEffect(async () => {
    await getListingById2(id, setListing);
  }, []);

  useEffect(async () => {
    if (listing) {
      await getUserDetails(listing.store_email, setStore);
    }
  }, [listing]);

  const handleSubmit = () => {
    const order_details = {
      listing_id: id,
      ordered_by: userDetails.email,
      shelter_name: userDetails.name,
      ordered_date: new Date(),
      order_status: "Order Sent",
      deliverer_name: "",
      deliverer_phone: "",
      ...listing,
    };

    handleNewOrder2(order_details);
    history.push("/");
  };

  // AIzaSyAQGsvrhfxDeNrqgubmm4G9xC1sBpS5xSg
  return (
    <div className="hero">
      <Navbar handleLogout={handleLogout} />
      <h1 className="section-title">Your order</h1>
      <div
        className="order-container"
        style={{ display: "block", width: "100%", margin: "2% auto" }}
      >
        <div className="map" style={{ margin: "0 auto" }}>
          {store && store.latitude && store.longitude ? (
            <MapContainer
              latlng1={{ latitude: store.latitude, longitude: store.longitude }}
              storeName={store.name}
            />
          ) : (
            "Loading..."
          )}
        </div>
        <div
          className="order-details"
          style={{
            margin: "3% auto",
            width: "100%",
            background: `linear-gradient( rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78) ),url(${
              store ? store.image : null
            })`,
          }}
        >
          <h2 className="order-listing-title">{listing.name}</h2>
          <h3 className="order-listing-title2">{listing.store_name}</h3>
          <h4 className="order-listing-details">
            Store Email : {listing.store_email}
          </h4>
          <h4 className="order-listing-details">
            Store Phone : {store ? store.phone : "Loading..."}
          </h4>
          <h4 className="order-listing-details">
            Store Location : {store ? store.location : "Loading..."}
          </h4>

          <h5 className="order-listing-details">
            Quantity : {listing.quantity}
          </h5>
        </div>
      </div>

      <div className="store_information_buttons">
        <button
          className="store_information_btn"
          onClick={() => {
            handleSubmit();
          }}
        >
          Confirm Order
        </button>
        <button
          className="store_information_btn"
          onClick={() => {
            history.push("/");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateNewOrder;
