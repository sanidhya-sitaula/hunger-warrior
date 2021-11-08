import fire from "../fire";

const db = fire.firestore();

/*
  Function to get all specific user's details in our database. 
  Parameters: 
  1. email : User email 
  2. setUserDetails state function. (To change/edit the `userDetails` state variable)
*/
export const getUserDetails = (email, setUserDetails) => {
  // Access the `users` table in our database with this user's email
  db.doc(`/users/${email}`)
    .get()
    .then((doc) =>
      // Set received data to userDetails state variable
      setUserDetails(doc.data())
    );
};

/*
    Function to get all the stores in our database. 
    Parameters : `setStores` state function. (To change/edit the `stores` state variable)
*/
export const getAllStores = async (setStores) => {
  // Access the users collection
  const users = await db.collection("/users/").get();
  // Convert the data received to an iterable map
  let users_map = users.docs.map((doc) => doc.data());
  // Select only the stores
  let stores_only = [];
  users_map.map((user) => {
    if (user.type === "Store") {
      // Push this object to the stores_only array
      stores_only.push({ store_email: user.email,
                         store_name: user.name,
                         store_location : user.location, 
                         store_phone : user.phone, 
                         store_image : user.image
                        });
    }
  });
  // Set the state variable to the stores_only array
  setStores(stores_only);
};

/*
    Function to get all the listings in our database. 
    Parameters : 
    1. `email`. If email is '', set listings to listings. Else, set listings to only listings made by the user with that `email`. 
    2. `setListings` state function. (To change/edit the `listings` state variable)
*/
export const getListings = async (email = "", setListings) => {
  const listings = await db.collection("/listings/").get();
  setListings(listings.docs.map((doc) => doc.data()));
};

/*
    Function to get all the requests made by a shelter in our database. 
    Parameters : 
    1. `email`: Shelter's email  
    2. `setRequests` state function. (To change/edit the `requests` state variable)
*/

export const getShelterRequests = async (email, setRequests) => {
  // access the `requests` table in our database
  const requests = await db.collection("/requests").get();
  // convert the received response to an iterable map
  let requests_map = requests.docs.map((doc) => doc.data());
  let request_array = [];
  // iterate through the map
  requests_map.map((request) => {
    // push to requests_array only if the current request's shelter email is same as the shelter email in our function parameter
    if (request.shelter_email === email) {
      request_array.push(request);
    }
  });
  // set the `requests` state variable to this our final array
  setRequests(request_array);
};

/*
  Function to add a new request to our database. 
  Parameters: `request_details` => an object containing all the details of the request (item name, store requested from, etc.)
*/
export const handleNewRequest = async (request_details) => {
  // add this request to our `requests` table
  return db.collection("/requests/").add(request_details);
};

/*
  Function to handle a login request 
  Parameters: 
  1. email : User email 
  2. password : User password 
  3. setEmailError : State function to change/edit the state variable 'emailError'. Used when the email entered is invalid.
  4. setPasswordError : State function to change/edit the state variable 'passwordError'. Used when the password entered is invalid.
  5. setUserDetails : State function to change/edit the state variable 'userDetails'. Used when there are no errors. 
*/

export const handleLogin = (
  email,
  password,
  setEmailError,
  setPasswordError,
  setUserDetails
) => {
  //clearErrors();
  //authenticate with firebase
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
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
      // If success, call the `getUserDetails` function to get the user's details.
    })
    .then(getUserDetails(email.toLowerCase(), setUserDetails));
};

let token, userId;
/*
    Function to handle user sign up. 
    Parameters: 
    1. name : User's name
    2. location : User's location 
    3. phone : User's phone 
    4. type : User's type (store/shelter)
    5. email : User's email 
    6. password : User's password 
    7. setEmailError : State function to change/edit the state variable 'emailError'. Used when the email entered is invalid.
    8. setPasswordError :  State function to change/edit the state variable 'passwordError'. Used when the password entered is invalid.
  */
export const handleSignUp = (
  name,
  location,
  phone,
  type,
  email,
  image,
  password,
  setEmailError,
  setPasswordError
) => {
  // authenticate with fireabase
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token) => {
      token = token;
      const userCredentials = {
        name: name,
        location: location,
        phone: phone,
        type: type,
        email: email,
        userId: userId,
        image : image,
      };
      return db.doc(`/users/${email}`).set(userCredentials);
    });
};

/*
    Function to handle user logout. 
    Parameters : None 
    -- Uses firebase's signOut() function. 
  */
export const handleLogout = () => {
  fire.auth().signOut();
};

/*
    Function to check if a user is already logged in. 
    Parameters : 
    1. setUser : State function to change/edit the 'user' state variable. 
    2. setLoading : State function to change/edit the 'loading' state variable. Used to display the loading icon. 
    3. setUserDetails : State function to change/edit the 'userDetails' state variable. 
  */
export const authListener = (setUser, setLoading, setUserDetails) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // set the 'user' state variable to the current user
      getUserDetails(user.email, setUserDetails);
      setUser(user);
      setLoading(false);
    } else {
      setUser("");
      setLoading(false);
    }
  });
};
