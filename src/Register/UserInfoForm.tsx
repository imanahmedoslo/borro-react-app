import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorPage } from "./ErrorPage";
import { useAuth } from "../App";

type UserInfoType = {
  firstName: string;
  lastName: string;
  profileImage: string;
  address: string;
  postCode: number;
  city: string;
  phoneNumber: string;
  birthDate: string;
  about: string;
  userId: number;
};

export function UserInfoForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { sessionInfo } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [about, setAbout] = useState("");
  const [userId, setUserId] = useState(
    params.userId ? parseInt(params.userId, 10) : 0,
  );

  async function CreateUserInfo(userInfo: UserInfoType): Promise<number> {
    const response = await fetch(
      "https://borro.azurewebsites.net/api/UserInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionInfo?.accessToken}`,
        },
        body: JSON.stringify({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          profileImage: userInfo.profileImage,
          address: userInfo.address,
          postCode: userInfo.postCode,
          city: userInfo.city,
          phoneNumber: userInfo.phoneNumber,
          birthDate: userInfo.birthDate,
          about: userInfo.about,
          userId: userInfo.userId,
        }),
      },
    );

    return response.status;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = {
      firstName,
      lastName,
      profileImage,
      address,
      postCode: parseInt(postCode, 10),
      city,
      phoneNumber,
      birthDate,
      about,
      userId,
    };

    const statusCode = await CreateUserInfo(userInfo);
    if (statusCode === 201) {
      navigate("/");
    } else {
      ErrorPage();
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        Vennligst legg til mer informasjon.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Typography component="h3">Last opp profilbilde</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Fornavn"
          autoFocus
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Etternavn"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Adresse"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Postnummer"
          name="postCode"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Poststed"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Telefonnummer"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Fødselsdato"
          type="date"
          name="birthDate"
          value={birthDate?.split("T")[0] ?? ""}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Bio"
          value={about}
          name="about"
          onChange={(e) => setAbout(e.target.value)}
          multiline
          rows={4}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
