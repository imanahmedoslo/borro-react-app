import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, Checkbox, Divider, FormControlLabel, FormGroup, Grow, Slider} from "@mui/material";
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

	return (
		<Box sx={{
			objectFit: "contain",
			width: "310px",
			position: "absolute",
			left: "2em",
			zIndex: 1,
		}}>
			<Button
				onClick={onClick}
				variant="contained"
				sx={{
					padding: "8px",
					backgroundColor: "#2f374a",
					boxShadow: 1,
					'&:hover': {
						boxShadow: 1,
						backgroundColor: "#293040",
					},
					'&:focus': {
						outline: 'none',
					},
					transition: "border-radius 0.2s ease",
					borderRadius: vis ? "0px 0px 0px 0px" : "0px 0px 5px 5px",
				}}
			>
				<Box sx={{
					display: "flex",
					justifyContent: "space-evenly",
					width: "100%",
					alignItems: "center",

				}}>
					<Typography sx={{
						marginLeft: "5px",
					}}>
						Filter
					</Typography>
					<ExpandMoreIcon
						sx={{
							color: "#c9c9c9",
							transform: vis ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.2s ease-in-out",

						}}
					/>
				</Box>
			</Button>

			<Grow in={vis} style={{transformOrigin: '0 0 0'}} mountOnEnter unmountOnExit >
				<Box
					sx={{
						backgroundColor: "#f6f6f6",
						border: "1px solid #c9c9c9",
						padding: "10px",
						borderRadius: "0px 5px 5px 5px",
						display: "block",
						transition: "display 1s ease",
					}}
				>
					<DistanceSlider sliderValue={sliderValue}
					                setSliderValue={setSliderValue}
					/>
					<Box mt={1}
					     mb={2}>
						<Divider/>
					</Box>
					<Typography>
						Kategori
					</Typography>
					<CategoryFilter/>
				</Box>
			</Grow>
		</Box>
	);
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

		<Box sx={{}}>
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

export function CategoryFilter() {

	return (
		<Box ml={3}>
			<FormGroup>
				<FormControlLabel control={<Checkbox/>} label="Bygg"/>
				<FormControlLabel control={<Checkbox/>} label="Hage"/>
				<FormControlLabel control={<Checkbox/>} label="Flytting"/>
				<FormControlLabel control={<Checkbox/>} label="Fritid"/>
				<FormControlLabel control={<Checkbox/>} label="Hus"/>
				<FormControlLabel control={<Checkbox/>} label="Elektronikk"/>
				<FormControlLabel control={<Checkbox/>} label="Bil"/>
				<FormControlLabel control={<Checkbox/>} label="Verktøy"/>
				<FormControlLabel control={<Checkbox/>} label="Lokaler"/>
				<FormControlLabel control={<Checkbox/>} label="Kjøkken"/>
			</FormGroup>
		</Box>
	)
}