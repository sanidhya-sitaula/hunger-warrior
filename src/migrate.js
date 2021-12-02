//import fire from './fire.js'; 
// Import the functions you need from the SDKs you need
const firebase = require('firebase'); 
const initializeApp = require('firebase/app')

// import firebase from 'firebase'; 
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LyJPjaZDcGW05ZJDRdI1MP91QvhORx0",
  authDomain: "hunger-warrior-a9839.firebaseapp.com",
  projectId: "hunger-warrior-a9839",
  storageBucket: "hunger-warrior-a9839.appspot.com",
  messagingSenderId: "473158672655",
  appId: "1:473158672655:web:d49b12ad8d4fab269e5e7a"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

const fs = require('fs'); 
const db = fire.firestore();

async function getListings(){
    try{
    const listings = await db.collection("/listings/").get();
    const orders = await db.collection("/orders/").get();
    const requests = await db.collection("/requests/").get();
    const users = await db.collection("/users/").get();

    let listing_array = []; 
    let orders_array = [];
    let requests_array = []; 
    let users_array = []; 

    listings.docs.map(listing => {
      const data = listing.data();
      const id = listing.id;
        listing_array.push({id, ... data})
    })

    orders.docs.map(order => {
        const data = order.data();
        const id = order.id;
        orders_array.push({id, ... data})
    })

    requests.docs.map(request => {
        const data = request.data();
        const id = request.id;
        requests_array.push({id, ... data})
    })

    users.docs.map(users => {
        users_array.push(users.data()); 
    })

    let final = {
        'listings' : listing_array,
        'orders' : orders_array,
        'requests' : requests_array,
        'users' : users_array
    }; 


    fs.writeFile('alldata.json', JSON.stringify(final), (err) => {
        if(err){
            console.log(err)
        }
    });  
    }
    catch(err){
        console.log(err);
    }
    }

  getListings();
  
