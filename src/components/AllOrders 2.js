import React, {useState, useEffect} from 'react'; 
import { displayOrders } from './Store/Orders';
import { displayOrders as displayOrdersForShelter} from './Shelter/Orders';  
import { getOrders2 } from "../functions/index";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";


const AllOrders = (props) => {
    const {userDetails, role} = props; 
    const [orders, setOrders] = useState([{}]);


    useEffect(() => {
        getOrders2(userDetails.email, setOrders);
      }, []);

    return (
        <div className = "hero">
            <Navbar />        
            <h1 className="section-title" style = {{marginBottom: '2%'}}>All Orders</h1>
            <Grid container spacing={3} style={{ marginTop: "2%" }}>
            <Grid item xs={12}>
                {role === 'Shelter' ? displayOrdersForShelter(orders, '') : displayOrders(orders, '')}
            </Grid>
            </Grid>
    </div>
    )
}

export default AllOrders; 