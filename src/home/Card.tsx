import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {useEffect, useState} from 'react';
import { postProps } from './Home';
import { useNavigate } from 'react-router-dom';



type cardProps = {
	title: string;
	description: string;
	id: number,
}

export default function ActionAreaCard(cardProps: cardProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/post/${cardProps.id}`)
	}


type CardProps={
	post:postProps
}
return (
		<Card onClick={handleClick} sx={{
			flexBasis: {
				xs: "100%",
				sm: "40%",
				md: "31%",

			},
			flexGrow: 1,
			maxHeight: 350,
			margin: 1,
			boxSizing: 'border-box',
		}}>
			<CardActionArea sx={{
				"&:focus": {
					outline: 'none',
				},
			}}>
				<CardMedia
					component="img"
					height="210"
					image="src/assets/img_1.png"
					alt="Placeholder"
					sx={{
						backgroundColor: "#8c8c8c"
					}}/>
				<CardContent className={"CardMuiContent"}>

					<Typography gutterBottom variant="h4" component="div">
						{cardProps.title}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{cardProps.description ?? "No description"}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}