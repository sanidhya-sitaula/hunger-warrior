import './App.css';
import React, {useState, useEffect} from "react"; 
// import fire from './fire'; 
import Login from './components/Login'; 
// import HomePage from './components/HomePage'; 
import ShelterHomePage from './components/ShelterHomePage'; 
import StoreHomePage from './components/StoreHomePage'; 
import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'; 
import {handleLogin, handleLogout, authListener, handleSignUp} from './functions/index'; 

const App = () => {
  
  // state variables 
  /*
  'useState' Usage: 
  const [VARIABLE_NAME, FUNCTION_TO_CHANGE_THE_VARIABLE] = useState(INITIAL_VARIABLE_VALUE)
  */
  const [user, setUser] = useState(''); 
  const [userDetails, setUserDetails] = useState({}); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); 
  const [hasAccount, setHasAccount] = useState(false);
  const [loading, setLoading] = useState(true);  
  
  
  // clear text inputs 
  const clearInputs = () => {
    setEmail('');
    setPassword(''); 
  }

  // clear errors 
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }


  //useEffect runs as soon as the page loads 
  useEffect(() => {
    authListener(setUser, setLoading, setUserDetails); 
    // check if a user is already logged in so that we know which page to display
  }, [])

  return (
    <div className="App">
      <section className = "banner">
        <h1 className = "title">HUNGER WARRIOR</h1>
      </section>
      {loading? 
      <div className = "loader"></div>: 
        !user ? (<Login email = {email} 
          setEmail = {setEmail} 
          password = {password} 
          setPassword = {setPassword}
          handleLogin = {handleLogin}
          handleSignUp = {handleSignUp}
          hasAccount = {hasAccount}
          setHasAccount = {setHasAccount}
          emailError = {emailError}
          passwordError = {passwordError}
          setEmailError = {setEmailError}
          setPasswordError = {setPasswordError}
          userDetails = {userDetails}
          setUserDetails = {setUserDetails}
      />) : (
        (userDetails.type === 'Shelter' ? 
        <ShelterHomePage
          handleLogout = {handleLogout} user = {user} 
          userDetails = {userDetails}/>
        : <StoreHomePage
          handleLogout = {handleLogout} user = {user} 
          userDetails = {userDetails}/>
        )
      )
      }
      </div>
  );
}

export default App;
