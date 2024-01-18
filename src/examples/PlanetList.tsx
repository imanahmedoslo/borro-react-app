import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


export type Planet = {
	uid: number,
	name: string,
	population: number,
}

export function PlanetList() {
	const [planets, setPlanets] = useState<Planet[]>([]);

	useEffect(() => {
		fetch("https://swapi.tech/api/planets/")
			.then(response => response.json())
			.then(data => setPlanets(data.results))
	}, []);

	return <>
		{planets.length === 0 && <h3>Laster...</h3>}
		{planets.map(p => <div>
			<Link to={`/planets/${p.uid}`}>{p.name}</Link>
		</div>)}
	</>
}