import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

type UserInfoType = {
  firstName: string,
  lastName: string,
  profileImage: string | null,
  address: string,
  postCode: string,
  city: string,
  phoneNumber: string,
  birthDate: string | null,
  about: string | null,
  userId: number,  
};

type UserCredentialsType = {
    email: string,
};

export function EditUserProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string}>();
  const userId = id ? parseInt(id, 10) : 0;
  console.log('Retrieved user ID from URL:', id);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('No user ID provided');
        navigate('/');
        return;
      }
      try {
        const userInfoResponse = await fetch(`https://borro.azurewebsites.net/api/UserInfo/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userCredentialsResponse = await fetch(`https://borro.azurewebsites.net/api/User/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!userInfoResponse.ok || !userCredentialsResponse.ok) {
          throw new Error('HTTP error while fetching user data');
        }

        const userInfoData = await userInfoResponse.json();
        const userCredentialsData = await userCredentialsResponse.json();

        setUserInfo({ ...userInfoData, userId }); // Update the form state with the fetched data
        setUserCredentials({ email: userCredentialsData.email}); // Do not prefill the password for security reasons
      } catch (error) {
        console.error('Failed to fetch user data', error);
        navigate('/error');
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    firstName: '',
    lastName: '',
    profileImage: null,
    address: '',
    postCode: '',
    city: '',
    phoneNumber: '',
    birthDate: '',
    about: null,
    userId: userId,
  });

  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>({
    email: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://borro.azurewebsites.net/api/UserInfo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userInfo),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      navigate(`/userProfile/${id}`);
    } catch (error) {
      console.error("Updating user info failed", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        Edit User Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Fornavn"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Etternavn"
          name="lastName"
          value={userInfo.lastName}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Epost"
          name="email"
          value={userCredentials.email}
          onChange={handleCredentialsChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Telefon"
          name="phoneNumber"
          value={userInfo.phoneNumber}
          onChange={handleInputChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Bio"
          name="text"
          value={userInfo.about}
          onChange={handleInputChange}
        />

|       <label htmlFor="birthDate">Fødselsdato</label>
        <input type="date" 
        name="birthDate" 
        form='yyyy-MM-dd' 
        value={userInfo.birthDate?.split("T")[0] ?? ""}
        onChange={handleInputChange}/>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};