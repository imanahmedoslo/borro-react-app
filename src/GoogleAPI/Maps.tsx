import axios from 'axios';
import logo from "../Logo.tsx";
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
import {GoogleMap, LoadScript} from "@react-google-maps/api";

interface ILocation {
	lat: number;
	lng: number;
}

type Library = "geometry";
const libraries: Library[] = ["geometry"];

async function getGeocode(address: string): Promise<ILocation> {
	const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs`);

	if (response.data && response.data.results && response.data.results[0] && response.data.results[0].geometry && response.data.results[0].geometry.location) {
		const geoLocation: ILocation = {
			lng: response.data.results[0].geometry.location.lng,
			lat: response.data.results[0].geometry.location.lat
		}
		console.log(geoLocation);
		return geoLocation;
	} else {
		throw new Error('Unable to find location');
	}
}

export const LocationDistance = () => {
	const [mapsLoaded, setMapsLoaded] = useState(false);
	const [distance, setDistance] = useState<number | null>(null);
	const location1: ILocation = {lat: 59.85996627807617, lng: 10.45582389831543};
	const location2: ILocation = {lat: 60.1452907, lng: 11.1938162};


	useEffect(() => {
		if (mapsLoaded) {
			const getDistance = (loc1: ILocation, loc2: ILocation): number => {
				const latLng1 = new window.google.maps.LatLng(loc1.lat, loc1.lng);
				const latLng2 = new window.google.maps.LatLng(loc2.lat, loc2.lng);
				return window.google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
			};

			async function fetchLocationsAndComputeDistance() {
				const loc1 = await getGeocode("asker trekanten");
				const loc2 = await getGeocode("Nydalen oslo spaces");
				setDistance(getDistance(loc1, loc2));
			}

			fetchLocationsAndComputeDistance();
		}
	}, [mapsLoaded]);

	return (
		<div>
			<LoadScript
				googleMapsApiKey="AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs"
				libraries={libraries}
				onLoad={() => setMapsLoaded(true)}>
			</LoadScript>

			{distance && distance > 0 ? <p>Distance: {distance} meters</p> : <p>Loading</p>}
		</div>
	);
};



