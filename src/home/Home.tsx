import React from "react";
import SearchAppBar from "./Search.tsx";
import ActionAreaCard from "./Card.tsx";


export function Home() {
	return (
		<>
			<div className={"CardContainer"}>
				<ActionAreaCard/>
				<ActionAreaCard/>
				<ActionAreaCard/>
			</div>
		</>
	)
}