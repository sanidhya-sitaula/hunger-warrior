import './App.css';
import React, {useState, useEffect} from "react"; 
import fire from './fire'; 
import Login from './components/Login'; 
import HomePage from './components/HomePage'; 

const App = () => {
  
  // state variables 
  /*
  'useState' Usage: 
  const [VARIABLE_NAME, FUNCTION_TO_CHANGE_THE_VARIABLE] = useState(INITIAL_VARIABLE_VALUE)
  */
  const [user, setUser] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); 
  const [hasAccount, setHasAccount] = useState(false); 
  
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

  // handles login 
  const handleLogin = () => {
    clearErrors(); 
    //authenticate with firebase 
      fire
        .auth()
        .signInWithEmailAndPassword(email, password) 
        .catch(err => {
          switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              // in case we get these errors, set the emailError variable to the error message
              setEmailError(err.message); 
              break;
            case "auth/wrong-password":
              // same as above
              setPasswordError(err.message); 
              break; 
          }
        })
  }

  // handle Sign Up 
  const handleSignUp = () => {
    clearErrors();
    // authenticate with fireabase
    fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message); 
              break;
            case "auth/weak-password":
              setPasswordError(err.message); 
              break; 
          }
        })
  }

  // handle logout 
  const handleLogout = () => {
    fire.auth().signOut(); 
  }

  // check to see if a user is already logged in 
  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user){
        // if so, clear all inputs
        clearInputs();
        // set the 'user' state variable to the current user
        setUser(user);
      }
      else {
        setUser(''); 
      }
    })
  }

  //useEffect runs as soon as the page loads 
  useEffect(() => {
    // check if a user is already logged in so that we know which page to display
    authListener(); 
  }, [])

  return (
    <div className="App">
      <section className = "banner">
        <h1 className = "title">HUNGER WARRIOR</h1>
      </section>
      {/* Check if a user is logged in. If so, display homepage. Else, display login page*/}
      {user ? (
        <HomePage handleLogout = {handleLogout} />
      ) : (<Login email = {email} 
        setEmail = {setEmail} 
        password = {password} 
        setPassword = {setPassword}
        handleLogin = {handleLogin}
        handleSignUp = {handleSignUp}
        hasAccount = {hasAccount}
        setHasAccount = {setHasAccount}
        emailError = {emailError}
        passwordError = {passwordError}
/>)}
      </div>
  );
}

export default App;
