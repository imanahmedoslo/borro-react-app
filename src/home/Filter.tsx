import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import {LocationDistance} from "../GoogleAPI/Maps.tsx";
import {Button} from "@mui/material";


export function Filter() {
	const [vis, setVis] = React.useState(false);

	const onClick = () => {
		setVis(!vis);
	}

	return (
		<Box sx={{objectFit: "contain", backgroundColor: "gray", width: "10%"}}>
			<Button
				onClick={onClick}
				sx={{
					'&:focus': {
						outline: 'none',
					}
				}} >
				Filter
			</Button>

			<Box sx={vis ? {backgroundColor: "#b6b6b6"} : {display: "none"}}>
				<Typography>Distance</Typography>
				<LocationDistance/>
			</Box>
		</Box>
	)
}