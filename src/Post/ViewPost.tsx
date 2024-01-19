import { useState, useEffect } from "react";


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

async function FetchPost(props:postProps){
	const res = await fetch(`https://localhost:7245/api/Post/${props.id}`);
    try{
        if(!res.ok) {
            throw new Error(`Http error status code ${res.status}`);
        }

        const resObject = await res.json();
        return resObject;
    } catch (error) {
        console.log(error);
        return Error("Could not find find this post.");
    }
  }

  
  export function ViewPost(props: postProps){
    const [post, setPost] = useState<postProps>();

	useEffect(() => {
        FetchPost(props)
        .then(post => setPost(post))
    },[]);

    return(
        
    )
  }