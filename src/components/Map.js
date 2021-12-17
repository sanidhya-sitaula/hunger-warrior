import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import Geocode from "react-geocode";

Geocode.setLanguage("en");
Geocode.setRegion("us");

class MapContainer extends React.Component {
  state = {
    lat: 0,
    lng: 0,
    loading: true,
    lat2: 0,
    lng2: 0,
    isOpen: false,
  };

  mapStyles = {
    height: this.props.height ? this.props.height : "500px",
    width: this.props.width ? this.props.width : "100%",
  };

  defaultCenter = {
    lat: this.state.lat,
    lng: this.state.lon,
  };

  componentDidMount() {

    if(this.props.latlng1) {
      this.setState({lat : this.props.latlng1.latitude, lng : this.props.latlng1.longitude, loading : false}); 
      if(this.props.latlng2) {
        this.setState({lat2 : this.props.latlng2.latitude, lng2 : this.props.latlng2.longitude, loading: false}); 
      }
    }
    else {
      Geocode.fromAddress(this.props.address).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ lat: lat, lng: lng, loading: false });
      });
  
      if (this.props.address2) {
        this.setState({ loading: true });
        Geocode.fromAddress(this.props.address2).then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ lat2: lat, lng2: lng, loading: false });
        });
      }
    }
  }

  render() {
    return this.state.loading ? (
      "LOADING..."
    ) : (
      <LoadScript googleMapsApiKey="">
        <GoogleMap
          mapContainerStyle={this.mapStyles}
          zoom={this.props.address2 ? 10 : 13}
          center={{ lat: this.state.lat, lng: this.state.lng }}
        >
          <Marker
            position={{ lat: this.state.lat, lng: this.state.lng }}
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            {this.state.isOpen ? (
              <InfoWindow
                position={{ lat: this.state.lat, lng: this.state.lng }}
                onCloseClick={() =>
                  this.setState({ isOpen: !this.state.isOpen })
                }
              >
                <p>{this.props.storeName}</p>
              </InfoWindow>
            ) : null}
          </Marker>


          {this.props.address2 || this.props.latlng2 ? (
            <Marker
              position={{ lat: this.state.lat2, lng: this.state.lng2 }}
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              {this.state.isOpen ? (
                <InfoWindow
                  position={{ lat: this.state.lat2, lng: this.state.lng2 }}
                  onCloseClick={() => {
                    this.setState({ isOpen: !this.state.isOpen });
                  }}
                >
                  <p>{this.props.shelterName}</p>
                </InfoWindow>
              ) : null}
            </Marker>
          ) : null}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;
