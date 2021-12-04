import * as React from 'react';
import { Link } from 'react-router-dom'; 

export default function NavBar(props) {

const {user, handleLogout, userDetails} = props; 

  return (
            <div className = "navbar">
            <nav>
                <Link to = '/' style = {{ textDecoration : 'none'}}>
                Home
            </Link> 
           
            <Link to = '/financials' style = {{ textDecoration : 'none'}}>
                Financials
            </Link>
            <a color="inherit" onClick = {handleLogout}>Logout</a>
            </nav>
            </div>
  );
}