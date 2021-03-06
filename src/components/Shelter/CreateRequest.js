import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  handleNewRequest2,
} from "../../functions/index";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";

const CreateRequest = (props) => {
  const history = useHistory();

  const [selectedStore, setSelectedStore] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemValue, setItemValue] = useState("");

  const { handleLogout, userDetails, stores } = props;

  const handleOnchange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleSubmit = () => {
    const request = {
      item_name: itemName,
      item_quantity: itemQuantity,
      store_email: selectedStore,
      shelter_email: userDetails.email,
      shelter_name: userDetails.name,
      item_value: parseFloat(itemValue),
      request_status: "Requested",
      request_date: new Date(),
    };

    stores.map((store) => {
      if (store.email === request.store_email) {
        request["store_name"] = store.name;
      }
    });

    handleNewRequest2(request);
    history.push("/");
  };

  return (
    <div className="hero">
      <Navbar handleLogout={handleLogout} />
      <h1 className="section-title">Create a New Request</h1>
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
              id="outlined-select-currency"
              select
              label="Store"
              value={selectedStore}
              onChange={handleOnchange}
              helperText="Please select the store you want to request from."
              style={{ width: "600px" }}
            >
              {stores.map((store) => (
                <MenuItem key={store.email} value={store.email}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
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
            <p style={{ textAlign: "center", margin: "2% auto" }}>
              *You need to mention the dollar value of the item before accepting
              just in order for it to register it for your Financial History.
              The item is still considered donated for free.
            </p>
          </li>
          <li>
            <button
              onClick={() => handleSubmit()}
              style={{ width: "600px", backgroundColor: "rgb(23, 122, 135)" }}
            >
              Request
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CreateRequest;
