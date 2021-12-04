import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { getOrders2, getTotalValue } from "../../functions/index";
import BasicTable from "../Table";
import Grid from "@mui/material/Grid";

const ShelterFinancials = (props) => {
  const { userDetails } = props;

  const [orders, setOrders] = useState();

  const [totalValue, setTotalValue] = useState(0);

  useEffect(async () => {
    await getOrders2(userDetails.email, setOrders);
    await getTotalValue(userDetails.email, setTotalValue);
  }, []);

  return (
    <div className="hero">
      <Navbar />
      <h2 class="section-title" style={{ marginBottom: "2%" }}>
        Your Financials
      </h2>
      <Grid container spacing={8}>
        <Grid item xs={9}>
          {orders ? (
            <BasicTable
              columns={[
                "Total Value",
                "Store",
                "Quantity",
                "Order Date",
                "Status",
                "View Details",
              ]}
              rows={orders}
              totalValue={totalValue}
              usedIn="Financials"
            />
          ) : (
            "Loading..."
          )}
        </Grid>
        <Grid item xs={3}>
          <div className="store_information" style={{ height: "95%" }}>
            <div style={{ margin: "20% auto", fontSize: "150%" }}>
              You've received a total value of{" "}
              <span style={{ fontWeight: "bold" }}>${totalValue}</span> through
              donations!
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShelterFinancials;
