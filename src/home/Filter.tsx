import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, Slider} from "@mui/material";
import {getPosts} from "../A/contextPage.tsx";
import {useAuth} from '../App.tsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type FilterProps = {
	sliderValue: number;
	setSliderValue: (value: number) => void;
}

export function Filter({sliderValue, setSliderValue}: FilterProps) {
	const {sessionInfo} = useAuth();
	const [vis, setVis] = useState(false);
	const [userAddress, setUserAddress] = useState<string>("");
	const [postAddress, setPostAddress] = useState<string>("");
	const [postDistance, setPostDistance] = useState<number>(0);

	useEffect(() => {
		async function fetchUserAddress() {
			// const userData = await getUser();
			setUserAddress(sessionInfo?.address ?? "");
		}

		async function fetchPostAddress() {
			const postData = await getPosts();
			setPostAddress(postData.address);
		}

		fetchUserAddress();
	}, [sessionInfo]);

	const onClick = () => {
		setVis(!vis);
	}

	console.log(userAddress);

	return (
		<Box sx={{
			objectFit: "contain",
			width: "310px",
			zIndex: 1,
			position: "absolute",
			left: "2em",
		}}>
			<Button
				onClick={onClick}
				variant="contained"
				sx={{
					backgroundColor: "#2f374a",
					'&:hover': {
						backgroundColor: "#293040",
					},
					'&:focus': {
						outline: 'none',
					}
				}}>

				Filter
				<ExpandMoreIcon sx={{
					color: "#c9c9c9",
					transform: vis ? "rotate(180deg)" : "rotate(0deg)",
					transition: "transform 0.2s ease-in-out",
				}}/>
					</Button>
					<Box
					sx={vis ? {
					backgroundColor: "#e7e7e7",
					padding: "5px",
				} :
				{display: "none"}}>
					<DistanceSlider sliderValue={sliderValue}
					                setSliderValue={setSliderValue}
					/>
		</Box>
</Box>
)
	;
}

function DistanceSlider({sliderValue, setSliderValue}: FilterProps) {
	const [value, setValue] = useState<number[]>([50]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		const value = newValue as number[];
		setValue(value);
	};

	function handleChangeCommited(event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]): void {
		const value = newValue as number[];
		setValue(value);
		setSliderValue(value[0]);
	}

	return (
		<Box sx={{
			width: 300,

		}}>
			<Typography id="range-slider" gutterBottom>
				Distance {value} km
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				onChangeCommitted={handleChangeCommited}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
			/>
		</Box>
	);
}