import "./App.css";
import React, { useState, useEffect } from "react";
import fire from "./fire";
import Login from "./components/Login";
import {
  getAllStores,
  getUserDetails,
  getAllStores2,
  getAllShelters,
} from "./functions/index";
import ViewOrder from "./components/Shelter/ViewOrder";
import { ViewOrder as ViewOrderForStore } from "./components/Store/ViewOrder";
import Profile from "./components/Store/Profile";
import CreateListing from "./components/Store/CreateNewListing";
import ShelterFinancials from "./components/Shelter/Financials";
import StoreFinancials from "./components/Store/Financials";

// backend
import {
  handleLogin,
  handleLogout,
  authListener,
  handleSignUp,
} from "./functions/index";
import StoreHome from "./components/Store/StoreHome";
import ShelterHome from "./components/Shelter/ShelterHome";
import CreateRequest from "./components/Shelter/CreateRequest";
import CreateNewOrder from "./components/Shelter/CreateNewOrder";
import Match from "./components/Shelter/Match";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  withRouter,
} from "react-router-dom";
import AllListings from "./components/AllListings";
import AllOrders from "./components/AllOrders";
import ViewRequest from "./components/Store/ViewRequest";
import AllRequests from "./components/AllRequests";
import ReactDOM from "react-dom";

// function
const App = () => {
  // state variables
  /*
  'useState' Usage: 
  const [VARIABLE_NAME, FUNCTION_TO_CHANGE_THE_VARIABLE] = useState(INITIAL_VARIABLE_VALUE)
  */
  const [user, setUser] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [stores, setStores] = useState([{}]);
  const [shelters, setShelters] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  // clear text inputs
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  // clear errors
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  //useEffect runs as soon as the page loads
  useEffect(async () => {
    await authListener(setUser, setLoading, setUserDetails);
    await getAllStores2(setStores);
    await getAllShelters(setShelters);
    // check if a user is already logged in so that we know which page to display
  }, []);

  useEffect(() => {
    if (isUser == true) {
      getUserDetails(email, setUserDetails);
    }
  }, [isUser]);

  return (
    <div className="App">
      <section className="banner">
        <h1 className="title">HUNGER WARRIOR</h1>
      </section>

      {loading ? (
        <div className="loader"></div>
      ) : !user ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          setEmailError={setEmailError}
          setPasswordError={setPasswordError}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setIsUser={setIsUser}
          setUser={setUser}
        />
      ) : userDetails.type === "Shelter" ? (
        <Router>
          <Switch>
            <Route
              path="/financials"
              component={() => (
                <ShelterFinancials
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/request"
              component={() => (
                <CreateRequest
                  user={user}
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                  stores={stores}
                />
              )}
            />
            <Route path="/listings" component={withRouter(AllListings)} />
            <Route
              path="/allOrders"
              component={() => (
                <AllOrders
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                  role="Shelter"
                />
              )}
            />
            <Route
              path="/vieworder/:id"
              component={() => (
                <ViewOrder
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/match"
              component={() => (
                <Match userDetails={userDetails} stores={stores} />
              )}
            />

            <Route
              path="/allRequests"
              component={() => (
                <AllRequests
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                  role="Shelter"
                />
              )}
            />
            <Route
              path="/profile/:email"
              component={() => <Profile userDetails={userDetails} />}
            />
            <Route
              exact
              path="/"
              component={() => (
                <ShelterHome
                  user={user}
                  handleLogout={handleLogout}
                  userDetails={userDetails}
                  stores={stores}
                />
              )}
            />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route
              path="/financials"
              component={() => (
                <StoreFinancials
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              exact
              path="/"
              component={() => (
                <StoreHome
                  user={user}
                  handleLogout={handleLogout}
                  userDetails={userDetails}
                  shelters={shelters}
                />
              )}
            />
            <Route
              path="/newlisting"
              component={() => (
                <CreateListing
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/vieworder/:id"
              component={() => (
                <ViewOrderForStore
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/viewrequest/:id"
              component={() => (
                <ViewRequest
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/listings"
              component={() => (
                <AllListings
                  store_email={userDetails.email}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/allRequests"
              component={() => (
                <AllRequests
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                  role="Store"
                />
              )}
            />
          </Switch>
        </Router>
      )}
      {/* Check if a user is logged in. If so, display homepage. Else, display login page*/}
    </div>
  );
};

export default App;
