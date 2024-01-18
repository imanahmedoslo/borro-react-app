import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


export type Planet = {
	uid: number,
	name: string,
	population: number,
}

export function PlanetList() {
	const [planets, setPlanets] = useState([]);

	useEffect(() => {
		fetch("https://swapi.dev/api/planets/")
			.then(response => response.json())
			.then(data => setPlanets(data.results))
	}, []);

	return <>
		{planets.map((planet: Planet) => {
			<div>
				<h3>{planet.name}</h3>
			</div>
		})}
	</>
}