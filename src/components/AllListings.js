import React, {useState, useEffect} from 'react'; 
import { displayListings } from './Shelter/Listings'; 
import {displayListings as displayListingsForStore } from './Store/Listings'; 
import { getAllListings2, getShelterRequests } from "../functions/index";
import Navbar from "./Navbar";


const AllListings = (props) => {
    const { store_email } = props; 
    
    const [listings, setListings] = useState([{}]);
    const [isStore, setIsStore] = useState(false); 
    
    useEffect(() => {
        if (store_email){
            getAllListings2(store_email, setListings); 
            setIsStore(true); 
        }
        else {
            getAllListings2("", setListings);
        }
      }, []);

    return (
        <div className = "hero">
            <Navbar />
            <h1 className="section-title" style = {{marginBottom: '2%'}}>All Listings</h1>
            {isStore? displayListingsForStore(listings, '') : displayListings(listings, '')}
        </div>
    )
}

export default AllListings; 