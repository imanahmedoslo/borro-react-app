import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material";

type UserInfoType = {
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  birthDate: Date;
  about: string;
  id: number;
  userInfo: UserInfo;
};

export type UserInfo = {
  profileImage: string;
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  birthDate: Date;
  about: string;
  id: number;
};

export function UserProfile() {
  const [user, setUser] = useState<UserInfoType | null>(null);
  //const[img, setImg] = useState<string>();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      console.log(`Fetching user info for ID: ${id}`);
      const response = await fetch(
        `https://borroapp.azurewebsites.net/api/User/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();
      setUser(userData);
      console.log("userData: ", userData);
    } catch (error) {
      console.error("Fetching user failed", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const onPictureUploaded = () => {
    fetchUser();
    console.log("on picture uplaoded implemented");
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  const customTheme = {
    display: "flex",
    padding: "20px 0 10px 80px",
    flexDirection: "row",

    justifyContent: "left",
  };

  return (
    <Container component="main" maxWidth="sm">
      <Avatar
        alt="User Avatar"
        src={user.userInfo.profileImage}
        sx={{
          width: 180,
          height: 180,
          borderRadius: "15px",
          margin: "auto",
          marginTop: "3em",
          imageOrientation: "center",
        }}
      />
      {/*<UploadPicture Type={"userInfo"} Id={id} onPictureUploaded={onPictureUploaded}/>
			 <Typography variant="h6">{user.email}</Typography>
				Add other user details here */}

      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid #e9e5de",
          margin: "50px 0 0 0",

          padding: 2,
        }}
      >
        <Divider textAlign={"left"}>Navn</Divider>
        <Box sx={customTheme}>
          <Typography variant="h5" gutterBottom>
            {user.userInfo.firstName} {user.userInfo.lastName}
          </Typography>
        </Box>

        <Divider textAlign={"left"}>Telefon</Divider>

        <Box sx={customTheme}>
          <Typography variant="h5" gutterBottom>
            {user.userInfo.phoneNumber}
          </Typography>
        </Box>

        <Divider textAlign={"left"}>Adresse</Divider>
        <Box sx={customTheme}>
          <Typography variant="h5" gutterBottom>
            {user.userInfo.address}, {user.userInfo.postCode}{" "}
            {user.userInfo.city}
          </Typography>
        </Box>

        <Divider textAlign={"left"}>Fødselsdato</Divider>
        <Box sx={customTheme}>
          <Typography variant="h5" gutterBottom>
            {user.userInfo.birthDate
              ? `${String(new Date(user.userInfo.birthDate).getDate()).padStart(
                  2,
                  "0",
                )}-${String(
                  new Date(user.userInfo.birthDate).getMonth() + 1,
                ).padStart(2, "0")}-${new Date(
                  user.userInfo.birthDate,
                ).getFullYear()}`
              : "Ikke tilgjengelig"}
          </Typography>
        </Box>

        <Divider textAlign={"left"}>Om meg:</Divider>
        <Box sx={customTheme}>
          <Typography variant="h5" gutterBottom>
            {user.userInfo.about}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          padding: "50px 0 10px 0",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(`/editUser/${user.id}`)}
          size="large"
          style={{ backgroundColor: "#D5B263", color: "white" }}
        >
          Rediger profil
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate(`/changePassword/${user.id}`)}
          size="large"
          style={{ backgroundColor: "#D5B263", color: "white" }}
        >
          Endre passord
        </Button>
      </Box>
    </Container>
  );
}
