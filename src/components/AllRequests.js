import React, {useState, useEffect} from 'react'; 
import {displayRequests as displayRequestsForStore} from './Store/Requests'; 
import {displayRequests} from './Shelter/Requests'; 
import {getRequests2} from '../functions/index'; 
import Navbar from "./Navbar";

const AllRequests = (props) => {
    const { userDetails, role } = props; 
    const [requests, setRequests] = useState({}); 

    useEffect(() => {
        getRequests2(userDetails.email, setRequests)
    }, [])    

    return (
        <div className = "hero">
            <Navbar />        
            <h1 className="section-title" style = {{marginBottom: '2%'}}>All Requests</h1>
            {requests ? role == "Store" ? displayRequestsForStore(requests, '') : displayRequests(requests, '') : null}
        </div>
    )

}

export default AllRequests; 