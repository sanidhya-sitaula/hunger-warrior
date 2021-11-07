import fire from '../fire'; 

const db = fire.firestore();

export const getUserDetails = (email, setUserDetails) => {
    db.doc(`/users/${email}`).get().then((doc) => 
        setUserDetails(doc.data()))
}

/*
    Function to get all the stores in our database. 
    Parameters : `setStores` state function. (To change/edit the `stores` state variable)
    Return : void
*/
export const getAllStores = async (setStores) => {
  // Access the users collection 
  const users = await db.collection('/users/').get(); 
  // Convert the data received to an iterable map
  let users_map = users.docs.map(doc => doc.data());
  // Select only the stores 
  let stores_only = []; 
  users_map.map(user => {
    if (user.type === "Store"){
      // Push this object to the stores_only array 
      stores_only.push({'store_email' : user.email, 'store_name' : user.name})
    }
  })
  // Set the state variable to the stores_only array
  setStores(stores_only); 
}


/*
    Function to get all the listings in our database. 
    Parameters : 
    1. `email`. If email is '', set listings to listings. Else, set listings to only listings made by the user with that `email`. 
    2. `setListings` state function. (To change/edit the `listings` state variable)
    Return : void
*/
export const getListings  = async (email = '', setListings) => {
  const listings = await db.collection('/listings/').get();
  setListings(listings.docs.map(doc => doc.data()));
}

/*
    Function to get all the requests made by a shelter in our database. 
    Parameters : 
    1. `email`: Shelter's email  
    2. `setRequests` state function. (To change/edit the `requests` state variable)
    Return : void
*/

export const getShelterRequests = async (email, setRequests) => {
  const requests = await db.collection('/requests').get();
  let requests_map = requests.docs.map(doc => doc.data()); 
  let request_array = []; 
  requests_map.map(request => {
    if (request.shelter_email === email) {
      request_array.push(request); 
    }
  })
  setRequests(request_array); 
}

//     return db.doc(`/users/${email}`).set(userCredentials);

export const handleNewRequest = async (request_details) => {
  return db.collection('/requests/').add(request_details); 
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



