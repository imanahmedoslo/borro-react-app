import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {LocationDistance} from "../GoogleAPI/Maps.tsx";
import {Button, Slider} from "@mui/material";
import {getPosts, getUser, ProfileType} from "../A/contextPage.tsx";


export function Filter() {
  const [vis, setVis] = useState(false);
  const [userAddress, setUserAddress] = useState<string>("");
  const [postAddress, setPostAddress] = useState<string>("");

  useEffect(() => {
    async function fetchUserAddress() {
      const userData = await getUser();
      setUserAddress(userData.address);
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
    <Box sx={{objectFit: "contain", backgroundColor: "#c9c9c9", width: "40%"}}>
      <Button
        onClick={onClick}
        sx={{
          '&:focus': {
            outline: 'none',
          }
        }}>
        Filter
      </Button>

      <Box sx={vis ? {backgroundColor: "#e7e7e7"} : {display: "none"}}>
        <LocationDistance userAddress={userAddress} postAddress={"oslo nydalen spaces"}/>
        <DistanceSlider/>
      </Box>
    </Box>
  )
}

function DistanceSlider() {
  const [value, setValue] = useState<number[]>([10]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{width: 300}}>
      <Typography id="range-slider" gutterBottom>
        Distance {value} km
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />

    </Box>
  );
}