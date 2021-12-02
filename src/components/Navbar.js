import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'; 
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom'; 
import Tax from './Tax';
import History from './History'; 
import ShelterHome from './Shelter/ShelterHome'; 
import StoreHome from './StoreHome'; 

export default function NavBar(props) {

const {user, handleLogout, userDetails} = props; 

  return (
            <div className = "navbar">
            <nav>
                <a><Link to = '/' style = {{ textDecoration : 'none'}}>
                Home
            </Link> </a>
            <a><Link to = '/tax' style = {{ textDecoration : 'none'}}>
                Financials
            </Link></a>
            <a><Link to = '/history' style = {{ textDecoration : 'none'}}>
                History
            </Link></a>
            <a color="inherit" onClick = {handleLogout}>Logout</a>
            </nav>
            </div>
  );
}