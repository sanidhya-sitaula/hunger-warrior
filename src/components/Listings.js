import React, {useState, useEffect} from 'react'; 
import { displayListings } from './ShelterHome'; 
import { getListings, getShelterRequests } from "../functions/index";
import Navbar from "./Navbar";


const AllListings = () => {
    const [listings, setListings] = useState([{}]);
    
    useEffect(() => {
        getListings("", setListings);
      }, []);

    return (
        <div className = "hero">
            <Navbar />
            <h1 className="section-title" style = {{marginBottom: '2%'}}>All Listings</h1>
            {displayListings(listings, '')}
    </div>
    )
}

export default AllListings; 