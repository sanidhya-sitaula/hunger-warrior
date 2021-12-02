import fire from "../fire";

const db = fire.firestore();

//1.
export const authListener = (setUser, setLoading, setUserDetails) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // set the 'user' state variable to the current user
      setUser(user);
      getUserDetails(user.email, setUserDetails);
      setLoading(false);
    } else {
      setUser("");
      setLoading(false);
    }
  });
};

export const handleLogin2 = async (
  email,
  password,
  setEmailError,
  setPasswordError,
  setIsUser,
  setUser
) => {
  await fetch(`http://localhost:8000/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => setUser(resp))
    .then(setIsUser(true))
    .then(handleLogin(email, password))
    .catch((error) => console.log(error));
};

export const getUserDetails = (email, setUserDetails) => {
  fetch(`http://localhost:8000/users?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => setUserDetails(resp));
};

export const getAllListings2 = (email = "", setListings) => {
  if (!email) {
    fetch("http://localhost:8000/listings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setListings(resp));
  } else {
    fetch(`http://localhost:8000/listings?email=${email}`, {
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
      },
    })
    .then((resp) => resp.json())
    .then((resp) => setListings(resp))
  }
};

export const getOrders2 = async (email, setOrders) => {
  fetch(`http://localhost:8000/orders?email=${email}`, {
    method : "GET",
    headers: {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then((resp) => setOrders(resp))
};

export const getAllStores2 = async (setStores) => {
  let results; 
  fetch('http://localhost:8000/users', {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setStores(resp)); 
}

export const getRequests2 = async (email, setRequests) => {
  // access the `requests` table in our database
  fetch(`http://localhost:8000/requests?email=${email}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setRequests(resp))
}

export const handleNewRequest2 = async (request_details) => {
  fetch(`http://localhost:8000/requests/`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(request_details)
  }).then((resp) => resp.json())
}

export const getListingById2 = async (id, setListing) => {
  fetch(`http://localhost:8000/listings?id=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    },
  }).then((resp) => resp.json()).then(resp => setListing(resp))
}

export const getRequestById2 = async (id, setRequest) => {
  fetch(`http://localhost:8000/requests?id=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setRequest(resp))
}

export const getOrder2 = async (id, setOrder) => {
  fetch(`http://localhost:8000/orders?id=${id}`, {
    method :  "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setOrder(resp))
}


export const handleNewListing2 = async(listing_details) => {
  fetch(`http://localhost:8000/listings/`, {
    method : 'POST',
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(listing_details)
  }).then((resp) => resp.json())
}

export const handleNewOrder2 = async(order_details) => {
  
  fetch(`http://localhost:8000/orders/`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json" 
    },
    body : JSON.stringify(order_details)
  }).then((resp) => resp.json())
}

export const handleStatusChange2 = async (id, newStatus) => {
  fetch(`http://localhost:8000/orders/?id=${id}`, {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(newStatus)
  }).then((resp) => resp.json())
}

export const deleteRequest2 = async (id) => {
  fetch(`http://localhost:8000/requests/?delete=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json())
}

export const deleteListing2 = async (id) => {
  fetch(`http://localhost:8000/listings/?delete=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json())
}

export const handleRequestStatusChange2 = async (id, newStatus) => {
  fetch(`http://localhost:8000/requests/?id=${id}`, {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(newStatus)
  }).then((resp) => resp.json())
}
 
export const handleRequestStatusChange = async (id, newStatus) => {
  return db.doc(`/requests/${id}`).update("request_status", newStatus);
};


export const handleLogin = (email, password) => {
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
          break;
        case "auth/wrong-password":
          // same as above
          break;
      }
      // If success, call the `getUserDetails` function to get the user's details.
    })
    .then(console.log("true"));
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
        image: image,
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
