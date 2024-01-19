import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import { useEffect, useState } from 'react';





export default function ActionAreaCard() {

	return (
		<Card sx={{maxWidth: 345, minWidth: 300}} className={"CardMui"}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image="src/assets/img.png"
					alt="Placeholder"
				/>
				<CardContent className={"CardMuiContent"}>
					<Typography gutterBottom variant="h5" component="div">
						Verktøy
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Dette er en test bby
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}