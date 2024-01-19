import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import { useEffect, useState } from 'react';

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

export default function ActionAreaCard(props: postProps) {
	const [post, setPost] = useState<postProps>();

	useEffect(() => {
        FetchPost(props)
        .then(post => setPost(post))
    },[]);

	return (
		<Card sx={{maxWidth: 345}} className={"CardMui"}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image="src/assets/img.png"
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
			</CardActionArea>
		</Card>
	);
}