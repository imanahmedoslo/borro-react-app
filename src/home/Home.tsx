import React, {useEffect} from "react";
import SearchAppBar from "./Search.tsx";
import ActionAreaCard from "./Card.tsx";
import { AuthContext } from "../A/contextPage.tsx";
import { useState,useEffect } from "react";
export type postProps = {
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
<<<<<<< Updated upstream
	const [posts, setPosts] = React.useState<postProps[]>([]);
	const [searchText, setSearchText] = React.useState('');
	const [filteredPosts, setFilteredPosts] = React.useState<postProps[]>([]);


	useEffect(() => {
		getPosts().then((posts: postProps[]) => setPosts(posts));
	}, []);

	useEffect(() => {
		setFilteredPosts(
			posts.filter(post =>
				post.title.toLowerCase().includes(searchText.toLowerCase())
			)
		);
	}, [posts, searchText]);

	return (
		<>
			<SearchAppBar setSearchText={setSearchText} />
			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
				margin: '0 auto',
				maxWidth: '96%',
				boxSizing: 'border-box',
			}}>
				{filteredPosts.map((post: postProps) =>
					<ActionAreaCard key={post.id}
					                title={post.title}
					                description={post.description}
					/>)
				}
=======
	const token = React.useContext(AuthContext);
    async function getPosts() {
    
        const response = await fetch("http://localhost:5066/api/Post",{headers:{'authorization':`Bearer ${token.accessToken}`}} );
        const posts:postProps[]= await response.json();
        return posts;
    
    }
    const[posts,setPost]=useState<postProps[]>()
    useEffect(()=>{
        getPosts().then(posts=>setPost(posts))
    },[])


	
	//getPosts().then((posts) =>console.log(posts))
		
	


	return (
		<>
		
			<div className={"CardContainer"}>
			{posts?.map(post=><ActionAreaCard key={post.id} post={post}/>)}
				<h2>id til logget inn person:{token.Id}</h2>

>>>>>>> Stashed changes
			</div>

		</>
	)
}

<<<<<<< Updated upstream
async function getPosts(): Promise<postProps[]> {
	const response = await fetch("https://borro.azurewebsites.net/api/Post");
	return await response.json();
=======
/*async function getPosts() {
	
	const response = await fetch("http://localhost:5066/api/Post",{headers:{'authorization': `Bearer ${token.accessToken}`}} );
	const posts:postProps[]= await response.json();
	return posts;
>>>>>>> Stashed changes

}*/