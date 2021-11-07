import React from 'react'; 
import NavBar from './Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Tax from './Tax';
import History from './History'; 

import { AppBar } from '@mui/material';

const StoreHome = (props) => {
    const {user, handleLogout, userDetails} = props; 
    return (
        <div>
            <h1>Store</h1>
            <NavBar user = {user} userDetails = {userDetails} handleLogout = {handleLogout}/>
        </div>
    )
}

export default StoreHome;