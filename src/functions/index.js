import fire from "../fire";
import Geocode from "react-geocode";

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
  await fetch(`https://hungerwarriorapi.herokuapp.com/login/`, {
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
  fetch(`https://hungerwarriorapi.herokuapp.com/users?email=${email}`, {
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
    fetch("https://hungerwarriorapi.herokuapp.com/listings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setListings(resp));
  } else {
    fetch(`https://hungerwarriorapi.herokuapp.com/listings?email=${email}`, {
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
  fetch(`https://hungerwarriorapi.herokuapp.com/orders?email=${email}`, {
    method : "GET",
    headers: {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then((resp) => setOrders(resp))
};

export const getAllStores2 = async (setStores) => {
  fetch('https://hungerwarriorapi.herokuapp.com/users?role=Store', {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setStores(resp)); 
}

export const getAllShelters = async (setShelters) => {
  fetch('https://hungerwarriorapi.herokuapp.com/users?role=Shelter', {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setShelters(resp));
}

export const getTotalValue = async (email, setTotalValue) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/totalValue?email=${email}`,{
    method : "GET", 
    headers : {
      "Content-Type" : "application/json"
    },
  }).then((resp) => resp.json()).then(resp => setTotalValue(resp)); 
}

export const getRequests2 = async (email, setRequests) => {
  // access the `requests` table in our database
  fetch(`https://hungerwarriorapi.herokuapp.com/requests?email=${email}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setRequests(resp))
}

export const handleNewRequest2 = async (request_details) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/requests/`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(request_details)
  }).then((resp) => resp.json())
}

export const getListingById2 = async (id, setListing) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/listings?id=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    },
  }).then((resp) => resp.json()).then(resp => setListing(resp))
}

export const getRequestById2 = async (id, setRequest) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/requests?id=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setRequest(resp))
}

export const getOrder2 = async (id, setOrder) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/orders?id=${id}`, {
    method :  "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json()).then(resp => setOrder(resp))
}


export const handleNewListing2 = async(listing_details) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/listings/`, {
    method : 'POST',
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(listing_details)
  }).then((resp) => resp.json())
}

export const handleNewOrder2 = async(order_details) => {
  
  fetch(`https://hungerwarriorapi.herokuapp.com/orders/`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json" 
    },
    body : JSON.stringify(order_details)
  }).then((resp) => resp.json())
}

export const handleStatusChange2 = async (id, newStatus) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/orders/?id=${id}`, {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(newStatus)
  }).then((resp) => resp.json())
}

export const handleDelivererStatusChange = async (id, name, phone) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/orders/?id=${id}&deliverer=True/`, {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      name : name,
      phone : phone
    })
  }).then((resp) => resp.json()); 
}

export const deleteRequest2 = async (id) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/requests/?delete=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json())
}

export const deleteListing2 = async (id) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/listings/?delete=${id}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((resp) => resp.json())
}

export const handleRequestStatusChange2 = async (id, newStatus) => {
  fetch(`https://hungerwarriorapi.herokuapp.com/requests/?id=${id}`, {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(newStatus)
  }).then((resp) => resp.json())
}
 

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

export const handleSignUp = async (
  name,
  location,
  phone,
  type,
  email,
  image,
  password,
  setEmailError,
  setPasswordError,
  setSignUpStatus
) => {
  // authenticate with fireabase

  let userCredentials; 

  let latlng = {}

  await Geocode.fromAddress(location).then((response) => {
    
    const {lat, lng} = response.results[0].geometry.location;  
    
    latlng = {
      latitude : lat,
      longitude : lng
    }
  })  

  userCredentials = {
    name: name,
    location: location,
    phone: phone,
    type: type,
    email: email,
    userId: userId,
    image: image,
    latitude : latlng.latitude, 
    longitude : latlng.longitude
  }

  await fetch(`https://hungerwarriorapi.herokuapp.com/signup/`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      'email' : email,
      'password' : password
    })
  })
  .then(
    fetch('https://hungerwarriorapi.herokuapp.com/users/',{
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(userCredentials)
    })).then(setSignUpStatus(true))
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
