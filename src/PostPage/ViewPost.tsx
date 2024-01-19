import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material";
import CardMedia from "@mui/material";
import CardContent from "@mui/material";


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
        <Card sx={{maxWidth: 345}} className={"CardMui"}>
				{/* <CardMedia
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
				</CardContent> */}
		</Card>   
        )
  }