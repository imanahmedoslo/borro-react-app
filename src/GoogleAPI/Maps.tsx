import axios from 'axios';
/*
async function getGeocode(address: string) {
	const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs`);
	return response.data.results[0].geometry.location;
}

const MapContainer = () => {
	const mapStyles = {height: "300px", width: "300px"};
	const [defaultCenter, setDefaultCenter] = useState({lat: 59.913868, lng: 10.752245});

	useEffect(() => {
		getGeocode("hvalstad").then(result => setDefaultCenter(result));
	}, []);


	return (
		<LoadScript googleMapsApiKey='AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs'>
			<GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>

			</GoogleMap>
		</LoadScript>
	);
}

*/
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";

interface ILocation {
  lat: number;
  lng: number;
}

type AddressProps = {
  userAddress: string,
  postAddress: string,
}


export async function getGeocode(address: string): Promise<ILocation> {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs`);

  if (response.data && response.data.results &&
    response.data.results[0] && response.data.results[0].geometry &&
    response.data.results[0].geometry.location) {
    const geoLocation: ILocation = {
      lng: response.data.results[0].geometry.location.lng,
      lat: response.data.results[0].geometry.location.lat
    }
    return geoLocation;
  } else {
    throw new Error('Unable to find location');
  }
}

export function LocationDistance(props: AddressProps) {
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (props.userAddress !== "" && props.postAddress !== "") {
      const getDistance = (loc1: ILocation, loc2: ILocation): number => {
        const latLng1 = new window.google.maps.LatLng(loc1.lat, loc1.lng);
        const latLng2 = new window.google.maps.LatLng(loc2.lat, loc2.lng);
        return window.google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
      };

      async function fetchLocationsAndComputeDistance() {
        const loc1 = await getGeocode(props.userAddress);
        const loc2 = await getGeocode(props.postAddress);
        setDistance(parseFloat((getDistance(loc1, loc2) / 1000).toFixed(2)));
      }

      fetchLocationsAndComputeDistance();
    }
  }, [props.userAddress, props.postAddress]);

  return (
    <div>
      {distance && distance > 0 ?
        <Typography>Distance: {distance}km</Typography> :
        <Typography>Loading</Typography>}
    </div>
  );
}