import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocationDistance } from "../GoogleAPI/Maps.tsx";
//import {getUser} from "../A/contextPage.tsx";
import { useAuth } from "../App.tsx";

type cardProps = {
  title: string;
  description: string;
  id: number;
  img: string;
  location: string;
  price: number;
};

export default function ActionAreaCard(cardProps: cardProps) {
  const { sessionInfo } = useAuth();
  const [userAddress, setUserAddress] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);
  const [titleLimit, setTitleLimit] = useState(window.innerWidth / 20);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserAddress() {
      //const userData = await getUser();
      setUserAddress(sessionInfo?.address ?? "");
    }

    fetchUserAddress();
  }, [cardProps.location]);

  useEffect(() => {
    function handleResize() {
      setTitleLimit(window.innerWidth / 70); // adjust the divisor value to get
      // desired truncation
    }

    window.addEventListener("resize", handleResize);

    // cleanup function to remove the listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    navigate(`/post/${cardProps.id}`);
  };

  //const titleLimit = 15;
  const descLimit = 30;
  const addressLimit = 30;

  return (
    <Card
      key={cardProps.id}
      onClick={handleClick}
      sx={{
        border: "1px solid #d9d9d9",
        backgroundColor: "#FFFFFF",
        borderRadius: 0,
        flexBasis: {
          xs: "100%",
          sm: "50%",
          md: "40%",
          lg: "30%",
        },
        flexGrow: 1,
        maxHeight: 370,
        margin: 2,
        boxSizing: "border-box",
        boxShadow: 0,
        "&:hover": {
          boxShadow: 0,
        },
      }}
    >
      <CardActionArea
        sx={{
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <CardMedia
          component="img"
          height="210"
          image={cardProps.img}
          src={cardProps.img}
          alt="Placeholder"
          sx={{
            backgroundColor: "#FFFFFF",
            objectFit: "contain",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <Divider></Divider>
        <CardContent className={"CardMuiContent"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              {cardProps.title?.length > titleLimit
                ? `${cardProps.title.substring(0, titleLimit)}...`
                : cardProps.title ?? "No Address"}
            </Typography>
            <Typography color="text.secondary">
              {cardProps.price == 0 || cardProps.price == null
                ? "gratis"
                : cardProps.price + ",-"}
            </Typography>
          </Box>
          {/*<Typography variant="h5" color="text.secondary">
            {cardProps.description?.length > descLimit
              ? `${cardProps.description.substring(0, descLimit)}...`
              : cardProps.description ?? "No description"}
            </Typography>*/}
          <Typography variant="body1" color="text.secondary">
            {cardProps.location?.length > addressLimit
              ? `${cardProps.location.substring(0, addressLimit)}...`
              : cardProps.location ?? "No Address"}
          </Typography>
          {cardProps.location ? (
            <LocationDistance
              userAddress={userAddress}
              postAddress={cardProps.location}
            />
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
