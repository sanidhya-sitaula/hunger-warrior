import React, { useState } from "react";
import Navbar from "../Navbar";
import { handleNewListing2 } from "../../functions/index";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

const CreateListing = (props) => {
  const history = useHistory();
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemValue, setItemValue] = useState(); 
  const { handleLogout, userDetails } = props;

  const handleSubmit = () => {
    const listing = {
      name: itemName,
      available: true,
      quantity: itemQuantity,
      store_email: userDetails.email,
      store_name: userDetails.name,
      date: new Date(),
      item_value : parseFloat(itemValue)
    };

    handleNewListing2(listing);

    history.push("/");
  };

  return (
    <div className="hero">
      <Navbar handleLogout={handleLogout} />
      <h1 className="section-title">Create a New Listing</h1>
      <div className="new-request-form">
        <ul className="new-request-form-items">
          <li>
            <TextField
              required
              id="outlined-required"
              label="Item Name"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setItemName(e.target.value)}
            />
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Quantity"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Value in Dollars"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setItemValue(e.target.value)}
            />
          </li>
          <li>
            <button
              onClick={() => handleSubmit()}
              style={{ width: "600px", backgroundColor: "rgb(23, 122, 135)" }}
            >
              Create Listing
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CreateListing;
