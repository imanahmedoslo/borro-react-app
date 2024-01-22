import {useState, useEffect} from "react";
import {Card} from "@mui/material";
import {CardMedia, CardContent, Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import {Button} from "@mui/material";


export type postProps = {
	postId: number,
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

async function FetchPost(id: number) {
	const res = await fetch(`https://borro.azurewebsites.net/api/Post/${id}`);
	try {
		if (!res.ok) {
			throw new Error(`Http error status code ${res.status}`);
		}

		const resObject = await res.json();
		return resObject;
	} catch (error) {
		console.log(error);
		return Error("Could not find find this post.");
	}
}

type ViewPostParams = {
    postId: string;
}

export function ViewPost() {
	const [post, setPost] = useState<postProps>();
    const {postId} = useParams<keyof ViewPostParams>() as ViewPostParams;

	useEffect(() => {
		if(postId){
			FetchPost(parseInt(postId))
				.then(thePost => setPost(thePost))
		}
	}, []);

    if (!post) {
        return <>Loading...</>
    }

	return (
		<div className="viewPostContainer">
		<Card sx={{maxWidth: 1000, maxHeight: 1000}} className={"PostMui"}>
			<CardMedia
				component="img"
				height="300"
				image="https://placehold.co/600x400"
				alt="Placeholder"
			/>
				<CardContent className={"CardMuiContent"}>
			<Typography gutterBottom variant="h4" component="div" marginLeft={2}>
				{post?.title}
			</Typography>
			<Typography variant="body1" color="text.secondary" marginLeft={2}>
				{post?.description}
			</Typography>
			<Typography variant="h5" color="text.secondary" textAlign={"right"} marginRight={7}>
				Pris: {post?.price},-
			</Typography>
			<div className="button-spacing">
				<Button variant="contained">Reserver</Button>
				<Button variant="contained">Kontakt</Button>
			</div>
		</CardContent>
		</Card>
		</div>
)
}