import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Planet} from "./PlanetList.tsx";


export function PlanetDetail() {
	const {planetId} = useParams();
	const [planet, setPlanet] = useState<Planet>();

	useEffect(() => {
		fetch(`https://www.swapi.tech/api/planets/${planetId}`)
			.then(r => r.json())
			.then(r => setPlanet(r.result.properties))
	}, [planetId]);


	return <>
		<h2>Planet med uid: {planetId}</h2>
		{!planet && <h3>Laster ... </h3>}
		<NavigateUsingLogic />
		{planet && <div>
        <h3>Navn: {planet.name}</h3>
        <h3>Befolkningstall: {planet.population}</h3>
    </div>}
	</>
}

export function NavigateUsingLogic() {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/planets');
	}

	return <button onClick={handleClick}>Back</button>
}