import React, {useEffect} from "react";
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
	const [posts, setPosts] = React.useState<postProps[]>([]);

	useEffect(() => {
		getPosts().then((posts: postProps[]) => setPosts(posts));
	}, []);

	return (
		<>
			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
				margin: '0 auto',
				maxWidth: '96%',
				boxSizing: 'border-box',
			}}>
				{posts.map((post: postProps) =>
					<ActionAreaCard key={post.id}
					                title={post.title}
					                description={post.description}
					/>)
				}
			</div>

		</>
	)
}

async function getPosts(): Promise<postProps[]> {
	const response = await fetch("https://borro.azurewebsites.net/api/Post");
	return await response.json();

}