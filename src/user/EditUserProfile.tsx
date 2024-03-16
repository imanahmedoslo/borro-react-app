import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { UploadPicture } from "../Post/UploadPicture";

type UserInfoType = {
  firstName: string;
  lastName: string;
  profileImage: string | null;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  birthDate: string | null;
  about: string | null;
  userId: number;
  id: number;
};

type UserCredentialsType = {
  email: string;
};

export function EditUserProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : 0;
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    firstName: "",
    lastName: "",
    profileImage: "",
    address: "",
    postCode: "",
    city: "",
    phoneNumber: "",
    birthDate: "",
    about: "",
    userId: userId,
    id: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>({
    email: "",
  });

  const uploadFile = async () => {
    if (!file) {
      // Handle the case when no file is selected
      console.log("No file selected for upload.");
      return null; // Or handle this scenario appropriately
    }
    const formData = new FormData();
    formData.append("Picture", file);
    formData.append("Type", "userInfo");
    formData.append("Id", `${userInfo?.id}`);

    try {
      const res = await axios.post(
        `https://borro.azurewebsites.net/api/FileUpload/`,
        formData,
      );
    } catch (ex) {
      console.log(ex);
    }
  };
  const fetchUserData = async () => {
    if (!userId) {
      console.error("No user ID provided");
      navigate("/");
      return;
    }
    try {
      const userInfoResponse = await fetch(
        `https://borro.azurewebsites.net/api/UserInfo/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const userCredentialsResponse = await fetch(
        `https://borro.azurewebsites.net/api/User/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!userInfoResponse.ok || !userCredentialsResponse.ok) {
        throw new Error("HTTP error while fetching user data");
      }

      const userInfoData = await userInfoResponse.json();
      const userCredentialsData = await userCredentialsResponse.json();

      setUserInfo({ ...userInfoData, userId }); // Update the form state with the
      // fetched data
      setUserCredentials({ email: userCredentialsData.email }); // Do not prefill
      // the password
      // for security
      // reasons
    } catch (error) {
      console.error("Failed to fetch user data", error);
      navigate("/error");
    }
  };
  useEffect(() => {
    fetchUserData();
    console.log(userInfo);
  }, [userId, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const status = await uploadFile();
      const response = await fetch(
        `https://borro.azurewebsites.net/api/UserInfo/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(userInfo),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate(`/userProfile/${id}`);
      console.log("file uplaoding status", status);
    } catch (error) {
      console.error("Updating user info failed", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <Container component="main" maxWidth="sm">
      <Typography
        component="h1"
        variant="h5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Rediger Bruker Profil
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <UploadPicture
              file={file}
              setFile={setFile}
              currentImage={userInfo?.profileImage ?? ""}
              userId={userId}
            />
          </Box>
        </Box>
        <TextField
          margin="normal"
          fullWidth
          label="Fornavn"
          name="firstName"
          value={userInfo.firstName ?? ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Etternavn"
          name="lastName"
          value={userInfo.lastName ?? ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Adresse"
          name="address"
          value={userInfo.address ?? ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Postnummer"
          name="postCode"
          value={userInfo.postCode ?? ""}
          onChange={handleInputChange}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Poststed"
          name="city"
          value={userInfo.city ?? ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Epost"
          name="email"
          value={userCredentials.email ?? ""}
          onChange={handleCredentialsChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Telefon"
          name="phoneNumber"
          value={userInfo.phoneNumber ?? ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Bio"
          name="about"
          value={userInfo.about ?? ""}
          onChange={handleInputChange}
        />
        | <label htmlFor="birthDate">Fødselsdato</label>
        <input
          type="date"
          name="birthDate"
          form="yyyy-MM-dd"
          value={userInfo.birthDate?.split("T")[0] ?? ""}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: "#D5B263", color: "white" }}
        >
          Lagre endringer
        </Button>
      </Box>
    </Container>
  );
}
