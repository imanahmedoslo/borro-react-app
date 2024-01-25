import {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
//import { useAuth } from "../App";


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
type ownerContacts = {
	firstName: string,
	lastName: string,
	phoneNumber: string,
	eMail: string,
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

async function FetchUserByPostId(id: number) {
	const res = await fetch(`https://borro.azurewebsites.net/api/UserInfo/postOwner/${id}?postId=${id}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});
	const responseJson: ownerContacts = await res.json();
	return responseJson;

}


type ViewPostParams = {
	postId: string;
}

export function ViewPost() {
	const [post, setPost] = useState<postProps>();
	const {postId} = useParams<keyof ViewPostParams>() as ViewPostParams;
	const [contacts, setContacts] = useState<ownerContacts | null>(null)
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (post != null || post != undefined) {
			FetchUserByPostId(post?.id).then(result => setContacts(result))
		}
		//FetchUserByPostId(post?.id).then(result=> setContacts(result))
	}, [post])
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (postId) {
			FetchPost(parseInt(postId))
				.then(p => setPost(p))
		}

	}, []);


	if (!post) {
		return <>Loading...</>
	}

	return (
		<Card sx={{
			maxWidth: 1000,
			maxHeight: 1000,
			margin: "auto",
		}}>
			<CardMedia
				component="img"
				height="500"
				image={`${post.image}`}
				src={post.image}
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

				<Box sx={{
					display: "flex",
					justifyContent: "center",
					gap: 4,
				}}>
					<Button variant="contained">Reserver</Button>
					<Button onClick={handleOpen} variant="contained">Kontakt</Button>
				</Box>
				<dialog open={open} onClose={handleClose}>
					<DialogContent>
						<p>Kontakt detaljer</p>
						<p>{contacts?.firstName} {contacts?.lastName}</p>
						<p></p>
						<p> epost {contacts?.eMail}</p>
						<p> telefon nummber {contacts?.phoneNumber}</p>
						<Button onClick={handleClose} color="primary">
							lukk vindu
						</Button>
					</DialogContent>
				</dialog>
			</CardContent>
		</Card>
	)
}