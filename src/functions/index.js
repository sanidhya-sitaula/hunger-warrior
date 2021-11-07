import fire from '../fire'; 

const db = fire.firestore();

export const getUserDetails = (email, setUserDetails) => {
    db.doc(`/users/${email}`).get().then((doc) => 
        setUserDetails(doc.data()))
}

export const getListings  = async (email = '', setListings) => {
  const listings = await db.collection('/listings/').get();
  setListings(listings.docs.map(doc => doc.data()));
}

export const handleLogin = (email, password, setEmailError, setPasswordError, setUserDetails) => {
    //clearErrors(); 
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
        }).then(getUserDetails(email.toLowerCase(), setUserDetails))
    }; 

  let token, userId; 
  // handle Sign Up 
  export const handleSignUp = (name, location, phone, type, email, password, setEmailError, setPasswordError, setUserDetails) => {
    //clearErrors();
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
        }).then((data) => {
            userId = data.user.uid; 
            return data.user.getIdToken();
        }).then(token => {
            token = token;
            const userCredentials = {
                name : name, 
                location : location,
                phone : phone,
                type : type, 
                email : email,
                userId : userId
            }
            return db.doc(`/users/${email}`).set(userCredentials);
        });
  }

  // handle logout 
  export const handleLogout = () => {
    fire.auth().signOut(); 
  }

  // check to see if a user is already logged in 
  export const authListener = (setUser, setLoading,setUserDetails) => {
    fire.auth().onAuthStateChanged(user => {
      if (user){
        // if so, clear all inputs
        //clearInputs();
        // set the 'user' state variable to the current user
        getUserDetails(user.email, setUserDetails);
        setUser(user);
        setLoading(false);

      }
      else {
        setUser(''); 
        setLoading(false);
      }
    })
  }



