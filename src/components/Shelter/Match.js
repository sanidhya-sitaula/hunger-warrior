import React, {useState, useEffect} from 'react'; 
import {getDistance, orderByDistance} from 'geolib'; 
import Navbar from "../Navbar";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";

const Match = (props) => {
    const { userDetails, stores } = props; 

    const [userLocation, setUserLocation] = useState({}); 
    const [distanceOrder, setDistanceOrder] = useState([]); 
    const [longLatArray, setLongLatArray] = useState([]); 
    const [mapStoreToCoord, setMapStoreToCoord] = useState([]); 
    const [storesAccToDistance, setStoresAccToDistance] = useState([]); 
    const [test, setTest] = useState({});


    const getUserLocation = async () => {
        await Geocode.fromAddress(userDetails.location).then((response) => {
            const {lat, lng} = response.results[0].geometry.location;  
            setUserLocation({latitude : lat, longitude : lng}); 
        })
    }

    const getLongLatArray = async () => {
        await stores.map(async (store) => {
            await Geocode.fromAddress(store.location).then((response) => {
                const {lat, lng} = response.results[0].geometry.location; 
                let newArray = longLatArray; 
                newArray.push({latitude : lat, longitude : lng})
                setLongLatArray(newArray);
                let newMapStoreArray = mapStoreToCoord; 
                newMapStoreArray.push({latitude : lat, longitude : lng, store : store.name}); 
                setMapStoreToCoord(newMapStoreArray); 
            })

        })

        
        let array = orderByDistance(userLocation, longLatArray);
        setDistanceOrder(array);
     

    }


    const sortStoresAccordingToDistance = (distanceOrder, mapStoreToCoord) => {
        distanceOrder.map(distance => {
            mapStoreToCoord.map(storeLocation => {
                if (distance.longitude == storeLocation.longitude && distance.latitude == storeLocation.latitude) {
                    let newStoreAccToDistance = storesAccToDistance; 
                    newStoreAccToDistance.push(storeLocation);
                    setStoresAccToDistance(newStoreAccToDistance);
                }
            })
        })
    }
    
    const displayStores = () => {
        return storesAccToDistance.map(storeDetails => {
            return stores.map(store => {
                if (store.name == storeDetails.store) {
                    return (
                        <div>
                            <h1>{store.name}</h1>
                            <h2>{store.email}</h2>
                        </div>
                    )
                }
            })
        })
    }


    useEffect(async () => {
        await getUserLocation(); 
    }, [])

    useEffect(async () => {
        if (userLocation){
            await getLongLatArray();
        }
    }, [userLocation])

   
    useEffect(() => {
        if (distanceOrder.length > 0) {
            sortStoresAccordingToDistance(distanceOrder, mapStoreToCoord); 
        }
    }, [distanceOrder])

    return (
        <div className = "hero">
            <Navbar />
            <h1 className="section-title" style = {{marginBottom: '2%'}}>Find a Match</h1>
            {displayStores()}
        </div>
    )
}

export default Match; 