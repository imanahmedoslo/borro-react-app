import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {LocationDistance} from "../GoogleAPI/Maps.tsx";
import {Button, Slider} from "@mui/material";
import {getPosts, getUser} from "../A/contextPage.tsx";
import { useAuth } from '../App.tsx';


type FilterProps = {
  sliderValue: number;
  setSliderValue: (value: number) => void;
}

export function Filter({sliderValue, setSliderValue}: FilterProps) {
  const{sessionInfo}=useAuth();
  const [vis, setVis] = useState(false);
  const [userAddress, setUserAddress] = useState<string>("");
  const [postAddress, setPostAddress] = useState<string>("");
  const [postDistance, setPostDistance] = useState<number>(0);

  useEffect(() => {
    async function fetchUserAddress() {
     // const userData = await getUser();
      setUserAddress(sessionInfo?.address??"");
    }

    async function fetchPostAddress() {
      const postData = await getPosts();
      setPostAddress(postData.address);
    }

    fetchUserAddress();
  }, []);

  const onClick = () => {
    setVis(!vis);
  }

  return (
    <Box sx={{
      objectFit: "contain",
      width: "310px",
      zIndex: 1,
      position: "fixed",

    }}>
      <Button
        onClick={onClick}

        sx={{
          backgroundColor: "#c9c9c9",
          '&:hover': {
            backgroundColor: "#c9c9c9",
          },
          '&:focus': {
            outline: 'none',
          },
          transform: " rotate(270deg) translateX(-214px) translateY(-18px)",

          position: "fixed",
        }}>
        Filter
      </Button>
      <Box
        sx={vis ? {
            backgroundColor: "#e7e7e7",
            padding: "5px",
          transform: "translateX(-0px) translateY(100px)",
          } :
          {display: "none"}}>
        <LocationDistance userAddress={userAddress}
                          postAddress={"oslo nydalen spaces"}
        />
        <DistanceSlider sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
        />
      </Box>
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