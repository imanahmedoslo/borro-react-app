import React, {useEffect, useState} from 'react';
import {Circle, GoogleMap, LoadScript} from '@react-google-maps/api';
import axios from 'axios';

async function getGeocode(address: string) {
	const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs`);
	return response.data.results[0].geometry.location;
}

const MapContainer = () => {
	const mapStyles = {height: "100vh", width: "100%"};
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
export default MapContainer;

