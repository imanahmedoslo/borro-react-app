import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {useEffect, useState} from 'react';


type cardProps = {
	title: string;
	description: string;
}

export default function ActionAreaCard(cardProps: cardProps) {

	return (
		<Card sx={{
			maxWidth: 345,
			minWidth: 300,
			margin: 5,
		}}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image="src/assets/img_1.png"
					alt="Placeholder"
					sx={{

						backgroundColor: "#8c8c8c"
					}}

				/>
				<CardContent className={"CardMuiContent"}>
					<Typography gutterBottom variant="h5" component="div">
						{cardProps.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{cardProps.description ?? "No description"}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}