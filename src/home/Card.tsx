import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {useEffect, useState} from 'react';
import {postProps} from './Home';
import {useNavigate} from 'react-router-dom';
import {LocationDistance} from "../GoogleAPI/Maps.tsx";
import {getPosts, getUser} from "../A/contextPage.tsx";


type cardProps = {
  title: string;
  description: string;
  id: number,
  location: string,
}

export default function ActionAreaCard(cardProps: cardProps) {
  const [userAddress, setUserAddress] = useState<string>("");
  const [postAddress, setPostAddress] = useState<string>("");


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserAddress() {
      const userData = await getUser();
      setUserAddress(userData.address);
    }
    setPostAddress(cardProps.location);

    fetchUserAddress();
  }, [ cardProps.location]);

  const handleClick = () => {
    navigate(`/post/${cardProps.id}`)
  }

  console.log("postAddress", cardProps.location, "\n userAddress", userAddress);


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
          <Typography variant="body1" color="text.secondary">
            {cardProps.location ?? "No Address"}
          </Typography>
          {cardProps.location ? <LocationDistance userAddress={userAddress} postAddress={cardProps.location}/> : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}