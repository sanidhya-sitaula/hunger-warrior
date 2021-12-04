import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MapContainer from "../Map";

const Match = (props) => {
  const { userDetails, stores } = props;

  const [distances, setDistances] = useState([]);

  const convertToMiles = (meters) => {
    return (meters * 0.000621371).toFixed(3);
  };

  const sortArray = (obj) => {
    let distances = [];
    let result = [];

    obj.map((store) => {
      distances.push(store[Object.keys(store)[0]]);
    });
    distances.sort((a, b) => {
      return a - b;
    });

    distances.forEach((distance) => {
      obj.map((object) => {
        if (object[Object.keys(object)[0]] == distance) {
          let newObj = {};
          newObj[Object.keys(object)[0]] = distance;
          result.push(newObj);
        }
      });
    });
    return result;
  };

  const getDistances = () => {
    let distancesArray = [];

    stores.forEach((store) => {
      let obj = {};

      let userCoords = {
        latitude: userDetails.latitude,
        longitude: userDetails.longitude,
      };

      let storeCoords = {
        latitude: store.latitude,
        longitude: store.longitude,
      };

      let distance = getDistance(userCoords, storeCoords, 1);

      obj[store.name] = distance;
      distancesArray.push(obj);
    });

    distancesArray = sortArray(distancesArray);
    setDistances(distancesArray);
  };

  const displayStores = (distances) => {
    return distances.map((distance_to_store) => {
      return stores.map((store) => {
        if (store.name == Object.keys(distance_to_store)[0]) {
          let profileLink = `/profile/${store.email}`;
          let listingsLink = `${profileLink}#listings-from-store`;

          return (
            <Grid container spacing={8}>
              <Grid item xs={7.5}>
                <div
                  className="store_information"
                  style={{ margin: "2% 0", width: "100%" }}
                >
                  <div className="store_picture">
                    <img width="100%" height="300" src={store.image}></img>
                  </div>
                  <h2 className="store_title">{store.name}</h2>
                  <h3 className="store_title">
                    Distance :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {convertToMiles(
                        distance_to_store[Object.keys(distance_to_store)[0]]
                      )}{" "}
                      miles
                    </span>
                  </h3>
                  <p className="store_location">{store.location}</p>
                  <p className="store_phone">{store.phone}</p>
                  <div className="store_information_buttons">
                    <Link className="store_links_1" to={listingsLink}>
                      View Listings
                    </Link>
                    <Link className="store_links_2" to={profileLink}>
                      Store Profile
                    </Link>
                  </div>
                </div>
              </Grid>

              <Grid item xs={4.5}>
                <div style={{ margin: "2% 0" }}>
                  <MapContainer
                    height="600px"
                    shelterName={userDetails.name}
                    storeName={store.name}
                    latlng1={{
                      latitude: userDetails.latitude,
                      longitude: userDetails.longitude,
                    }}
                    latlng2={{
                      latitude: store.latitude,
                      longitude: store.longitude,
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          );
        }
      });
    });
  };

  useEffect(() => {
    getDistances();
  }, []);

  return (
    <div className="hero">
      <Navbar />
      <h1 className="section-title" style={{ marginBottom: "2%" }}>
        Find a Match
      </h1>
      <h2
        className="section-title"
        style={{ textAlign: "center", marginBottom: "2%" }}
      >
        Here is a list of the best matches according to your location:
      </h2>
      {distances ? displayStores(distances) : null}
    </div>
  );
};

export default Match;
