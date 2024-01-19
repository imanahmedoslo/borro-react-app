import React from "react";
import SearchAppBar from "./Search.tsx";
import ActionAreaCard from "./Card.tsx";

type postProps = {
	id: number,
	title: string,
	image: string,
	price: number,
	dateFrom: Date,
	dateTo: Date,
	description: string,
	location: string,
	categoryId: number,
	userId: number
}

type postState = {
	posts: postProps[]
}

export function Home() {

	getPosts().then((posts) => { console.log(posts)});

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

async function getPosts() {
	const response = await fetch("https://borro.azurewebsites.net/api/Post");
	return await response.json();

}