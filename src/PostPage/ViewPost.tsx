import {useState, useEffect} from "react";
import {Card} from "@mui/material";
import {CardMedia, CardContent, Typography} from "@mui/material";
import { useParams } from "react-router-dom";


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
	const res = await fetch(`https://localhost:7245/api/Post/${id}`);
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
		FetchPost(parseInt(postId))
			.then(thePost => setPost(thePost))
	}, []);

    if (!post) {
        return <>Loading...</>
    }

	return (
		<Card sx={{maxWidth: 345}} className={"CardMui"}>
			<CardMedia
				component="img"
				height="140"
				image="https://placehold.co/600x400"
				alt="Placeholder"
			/>
				<CardContent className={"CardMuiContent"}>
			<Typography gutterBottom variant="h5" component="div">
				{post?.title}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{post?.description}
			</Typography>
		</CardContent>
		</Card>
)
}