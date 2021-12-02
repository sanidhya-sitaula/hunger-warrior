import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getOrder2, getUserDetails } from "../../functions/index";
import { useParams } from "react-router-dom";
import MapContainer from "../Map";
import Grid from "@mui/material/Grid";

const Profile = () => {
    const { email } = useParams();

    const [storeDetails, setStoreDetails] = useState({})

    useEffect(() => {
        getUserDetails(email, setStoreDetails)
    }, [])

    return (
        <div className = "hero">
            <Navbar />
            {storeDetails && storeDetails.location ? 
            <div>
            <h1 className = "section-title">{storeDetails.name}</h1>
            <Grid container spacing = {9}>
                <Grid item xs = {7}>
                    <div>

                    </div>
                </Grid>

                <Grid item xs = {5}>
                <div className = "profile-map" style = {{}}>
                        <MapContainer
                            address={storeDetails.location}
                            storeName={storeDetails.name}
                            width='50%'
                        />
                </div>
                </Grid>
            
              </Grid>

         </div>
        : null}
        </div>
    )
}

export default Profile; 