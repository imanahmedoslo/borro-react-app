import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Planet} from "./PlanetList.tsx";


export function PlanetDetail () {
	const {planetId} = useParams();
	const [planet, setPlanet] = useState<Planet>();
const navigate = useNavigate();
	useEffect(() => {
		fetch(`https://www.swapi.tech/api/planets/${planetId}`)
			.then(response => response.json())
			.then(data => setPlanet(data))
	}, [planetId]);

	const handleClick = () => {
		navigate('/planets');

	}

	return <>
		<h3>{planet?.name}</h3>
		<p>Population: {planet?.population}</p>
		<button onClick={handleClick}>Back</button>
	</>
}