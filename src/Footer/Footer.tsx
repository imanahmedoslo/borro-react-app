import {Box, Typography} from "@mui/material";

export function Footer() {

	return (
		<Box sx={{
			gridArea: "footer",
			textAlign: "center",
			backgroundColor: "#293040",
			boxShadow: 4,
		}}>
			<Typography gutterBottom variant="body2" color={"beige"}>
				Graduation Project 2024
			</Typography>
		</Box>
	);
}