import {useEffect, useState} from "react";
import {Avatar, Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import borroNobg from "C:/Users/ImanAhmed/source/repos/borro-react-app/src/assets/borro-nobg.png"
import img from "C:/Users/ImanAhmed/source/repos/borro-react-app/src/assets/img_1.png"
import logoPng from "C:/Users/ImanAhmed/source/repos/borro-react-app/src/assets/Logo.png"
import DialogContent from '@mui/material/DialogContent';
import Reservation from "./Reservation";

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

	const customTheme = {
		display: 'flex',
		padding: "10px 0 10px 10px",
		flexDirection: 'row',

		justifyContent: 'left',
	};
	const customTheme3 = {
		display: 'flex',
		padding: "10px 0 10px 10px",
		flexDirection: 'column',
		justifyContent: '',
		height:'100px'

	};
	const customTheme1 = {
		display: 'flex',
		padding: "10px 0 10px 10px",
		flexDirection: 'row',

		justifyContent: 'left',
	};
	const customTheme2 = {
		display: 'flex',
		padding: "10px 0 10px 10px",
		flexDirection: 'row',
		justifyContent: 'end',
		marginRight:'30px',
		height:'30px',
		
	}; 

	if (!post) {
		return <>Loading...</>
	}
	return(
		
	<Container component="main" maxWidth="xl" style={{border: '3px solid #ffffff',
	marginTop:'10px',
	marginBottom:'10px',
	display:'flex',
	flexDirection:'row',
	borderRadius:'15px',
	justifyContent:'space-around',
	width:'100vw',
	flexWrap:'wrap',
	}}>
			
	
	{/*<UploadPicture Type={"userInfo"} Id={id} onPictureUploaded={onPictureUploaded}/>
	 <Typography variant="inherit">{user.email}</Typography>
		Add other user details here
		<Avatar
		alt="User Avatar"
		src={logoPng}
		sx={{ borderRadius:'15px', margin: 'auto', imageOrientation: "center"}}
		style={{width:'auto', height: '100px' borderRadius:'15px', margin: 'auto', imageOrientation: "center"}}
	/>
		 */}
		 <Box sx={{maxWidth: '20rem', margin: 'auto'}}>
		 <h1 style={{fontSize:'40px'}}>Tittel</h1>	
			<img src={logoPng} style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '15px',
                    display: 'block',
                    imageOrientation: 'center'
                }}/>
			<Divider textAlign={"left"}>
		</Divider>

		<Box sx={customTheme1}>

			<Typography variant='body1' gutterBottom textAlign={'left'}>
			Addresse: Addresse her
			</Typography>
		</Box>


		<Divider textAlign={"left"}>
		</Divider>
		<Box sx={customTheme2}>

			<Typography variant='inherit' gutterBottom textAlign={'end'}>
			{true?'pris'+',-':'Gratis'}
			</Typography>
		</Box>
			</Box>
	<Box sx={{
		borderRadius: 2,
		display:'flex',
		flexDirection:'column',
		justifyContent:'space-evenly',
		minWidth:'40vw'
		}}
		>
		<Divider  textAlign={"left"}>
		Beskrivelse:
		</Divider>
		<Box sx={customTheme}>

			<Typography variant='inherit' gutterBottom>
				Beskrivelse her
			</Typography>
		</Box>
		<Divider textAlign={"left"}>
			Kategori:
		</Divider>
		<Box sx={customTheme}>

			<Typography variant='inherit' gutterBottom>
				{true
					? 'Kategori her'
					: 'Ikke tilgjengelig'}
			</Typography>
		</Box>
		<Divider textAlign={"left"}>
		Kontaktinformasjon
		</Divider>
		<Box sx={customTheme3}>

			<Typography variant='inherit' gutterBottom>
				Navn:
			</Typography>
			<Divider></Divider>
			<Typography style={{fontWeight:'bold'}} variant='inherit'  gutterBottom>
				Email:
			</Typography>
			<Divider></Divider>
			<Typography variant='inherit' gutterBottom>
				Telefonnummer:
			</Typography>
		</Box>
		<Box display={'grid'}>
		<Button variant="contained"
				onClick={() =>{}}
				size="large"
		style={{backgroundColor:  '#D5B263', marginLeft:'20px', color: 'white', justifySelf:'center', width:'200px', marginBottom:'10px'}}>
		
			Reserver
		</Button>
		</Box>
	</Box>
	<Divider/>
</Container>)


	/*return (
		<Card sx={{
			maxWidth: 700,
			maxHeight: 1000,
			margin: "auto",
			boxShadow: 3,
		}}>
			<CardMedia
				component="img"
				height="500"
				image={`${post.image}`}
				src={post.image}
				alt="Placeholder"
			/>
			<CardContent className={"CardMuiContent"}>

				<Box sx={{
					display: "grid",
					gridTemplateAreas: `
					"title title"
					"desc price"
					". ."`,
					gridTemplateColumns: "1fr auto",
					gridTemplateRows: "3fr auto 2fr",

					gap: 0,
				}}
				     marginX={20}>
					<Typography variant="h4"
					            sx={{
						            gridArea: "title",
						            alignSelf: "end",
					            }}
					>
						{post?.title}
					</Typography>

					<Typography variant="body1"
					            color="text.secondary"
					            sx={{
						            gridArea: "desc",
						            alignSelf: "end",
					            }}
					>
						{post?.description}
					</Typography>

					<Typography variant="inherit"
					            color="text.secondary"
					            sx={{
						            gridArea: "price",
						            alignSelf: "end",
					            }}
					>
						Pris: {post?.price <= 0 ? "Gratis" : post?.price + ",-"}
					</Typography>

				</Box>
				<Box sx={{
					display: "flex",
					justifyContent: "center",
					gap: 4,
				}}
				>
					<Reservation postId={post.id} price={post.price}/>
					<Button onClick={handleOpen} variant="contained" style={{backgroundColor:'#D5B263', color:'white'}}>Kontakt</Button>
				</Box>
				<dialog open={open} onClose={handleClose} style={{ position: 'fixed', bottom: '150px', borderRadius: '5px'}}>
					<DialogContent style={{textAlign:'center'}}>
						<p>Kontakt detaljer</p>
						<p>{contacts?.firstName} {contacts?.lastName}</p>
						<p> epost {contacts?.eMail}</p>
						<p> telefon nummber {contacts?.phoneNumber}</p>
						<Button onClick={handleClose} style={{ marginTop: '10px', backgroundColor:'#D5B263', color:'white', borderRadius: '5px' }}>
							lukk vindu
						</Button>
					</DialogContent>
				</dialog>
			</CardContent>
		</Card>
	)*/
}
