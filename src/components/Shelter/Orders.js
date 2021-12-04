import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import MediaCard from "./Card";
import MediaCard2 from "./Card2";

export let displayOrders = () => {};

const Orders = (props) => {
  const { orders } = props;

  const sortOrders = (orders) => {
    orders.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    return orders;
  }


  displayOrders = (orders, num_items = "") => {
    orders = sortOrders(orders); 
    if (num_items === "") {
      num_items = orders.length;
    }

    return orders.slice(0, num_items).map((order) => {
      return (
        <Grid
          item
          xs={3}
          style={{ display: "inline-flex", marginRight: "10px" }}
          key = {order.id}
        >
          <MediaCard
            name={order.name}
            store_email={order.store_email}
            store_name={order.store_name}
            quantity={order.quantity}
            date_posted={order.date}
            available="Not Applicable"
            id={order.id}
            type="order"
            order_status={order.order_status}
            className="orders-card"
          />
        </Grid>
      );
    });
  };

  return (
    <div class="homepage-section">
      <h2 class="section-title">Ongoing Orders</h2>
      <Grid container spacing={2} style={{ marginTop: "2%" }}>
        <Grid item xs={9}>
          <div className="orders">
            {orders ? displayOrders(orders, 3) : null}
            <Grid
              item
              xs={3}
              style={{ display: "inline-flex", marginLeft: "10px" }}
            >
              <Link to="/allOrders" style={{ textDecoration: "None" }}>
                <MediaCard2 name="See All Orders..." icon="view_all" type = "orders" />
              </Link>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className="border" />
    </div>
  );
};

export default Orders;
