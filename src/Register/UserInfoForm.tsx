import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

type UserInfoType = {
  firstName: string,
  lastName: string,
  profileImage: string,
  address: string,
  postCode: number,
  city: string,
  phoneNumber: string,
  birthDate: string,
  about: string,
  userId: number,
};

async function CreateUserInfo(userInfo: UserInfoType, authToken: string): Promise<number> {
  const response = await fetch('https://borro.azurewebsites.net/api/UserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`},
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
      userId: userInfo.userId
    })
  });

  return response.status;
}

export function UserInfoForm(){
  const navigate = useNavigate();
  const params = useParams();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(''); 
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [about, setAbout] = useState('');
  const [userId, setUserId] = useState(params.userId ? parseInt(params.userId, 10) : 0); 

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

    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('Authentication token is not available.');
      return navigate('/login');
    }
    
    const statusCode = await CreateUserInfo(userInfo, authToken);
    if (statusCode === 201) {
      navigate('/');
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
        <TextField
          margin="normal"
          required
          fullWidth
          label="Fornavn"
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Etternavn"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Profile Image URL"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Postnummer"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Poststed"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Telefonnummer"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Fødselsdato"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Bio"
          value={about}
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