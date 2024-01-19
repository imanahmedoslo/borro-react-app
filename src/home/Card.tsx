import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
<<<<<<< Updated upstream
import {useEffect, useState} from 'react';
=======
import { useEffect, useState } from 'react';
import { postProps } from './Home';
>>>>>>> Stashed changes


type cardProps = {
	title: string;
	description: string;
}

<<<<<<< Updated upstream
export default function ActionAreaCard(cardProps: cardProps) {

=======
type CardProps={
	post:postProps
}

export default function ActionAreaCard(post:CardProps) {
const postObject= post.post;
>>>>>>> Stashed changes
	return (
		<Card sx={{
			flexBasis: {
				xs: "100%",
				sm: "40%",
				md: "31%",

			},
			flexGrow: 1,
			maxHeight: 300,
			margin: 1,
			boxSizing: 'border-box',
		}}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="210"
					image="src/assets/img_1.png"
					alt="Placeholder"
					sx={{
						backgroundColor: "#8c8c8c"
					}}/>
				<CardContent className={"CardMuiContent"}>
<<<<<<< Updated upstream
					<Typography gutterBottom variant="h4" component="div">
						{cardProps.title}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{cardProps.description ?? "No description"}
=======
					<Typography gutterBottom variant="h5" component="div">
						{postObject.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{postObject.description}
>>>>>>> Stashed changes
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}