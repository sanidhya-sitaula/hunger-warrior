import React, { useEffect } from "react";
import { getAllShelters } from "../../functions/index";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import Geocode from "react-geocode";

Geocode.setLanguage("en");
Geocode.setRegion("us");
Geocode.setApiKey("AIzaSyAQGsvrhfxDeNrqgubmm4G9xC1sBpS5xSg");

class SheltersMap extends React.Component {
  state = {
    shelterCoords: {},
    isOpen: false,
    loading: true,
  };

  mapStyles = {
    height: "500px",
    width: "100%",
  };

  getShelterCoords() {
    let resultsArray = [];

    this.props.shelters.map((shelter) => {
      let obj = {
        lat: shelter.latitude,
        lng: shelter.longitude,
        name: shelter.name,
      };
      resultsArray.push(obj);
    });

    this.setState({ shelterCoords: resultsArray, loading: false });
  }

  async componentDidMount() {
    this.getShelterCoords();
  }

  displayMarkers() {
    return this.state.shelterCoords.map((shelterCoord) => {
      return (
        <Marker
         animation = "DROP"
          position={{ lat: shelterCoord.lat, lng: shelterCoord.lng }}
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
          >

          {this.state.isOpen ? (
            <InfoWindow
              position={{ lat: shelterCoord.lat, lng: shelterCoord.lng }}
              onCloseClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              <p>{shelterCoord.name}</p>
            </InfoWindow>
          ) : null}

        </Marker>
      );
    });
  }

  render() {
    return (
      <div>
        <h2 class = "section-title">Shelters Near You</h2>
        {!this.state.loading ? (
          <div style={{ margin : "2% auto" }}>
            <LoadScript googleMapsApiKey="AIzaSyAQGsvrhfxDeNrqgubmm4G9xC1sBpS5xSg">
              <GoogleMap
                mapContainerStyle={this.mapStyles}
                zoom={11}
                center={{
                  lat: this.props.userDetails.latitude,
                  lng: this.props.userDetails.longitude,
                }}
              >
                {this.displayMarkers()}
                
                        <Marker
                position={{ lat: this.props.userDetails.latitude, lng: this.props.userDetails.longitude }}
                onClick={() => {
                    this.setState({ isOpen: !this.state.isOpen });
                }}
            onLoad={marker => {
                const customIcon = (opts) => Object.assign({
                path: 'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
                fillColor: '#000000',
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 1,
                scale: 1.3,
                }, opts);

            marker.setIcon(customIcon({
              fillColor: 'green',
              strokeColor: 'white'
            }))}}
          >

          {this.state.isOpen ? (
            <InfoWindow
              position={{ lat: this.props.userDetails.latitude, lng: this.props.userDetails.longitude }}
              onCloseClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              <p>{this.props.userDetails.name}</p>
            </InfoWindow>
          ) : null}

        </Marker>
              </GoogleMap>
            </LoadScript>
          </div>
        ) : (
          "Loading..."
        )}
        
        <div className = "border" />
      </div>
    );
  }
}

export default SheltersMap;
