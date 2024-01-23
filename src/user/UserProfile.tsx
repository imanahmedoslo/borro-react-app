import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Avatar, Button, Container, Typography} from '@mui/material';

type UserInfoType = {
  firstName: string,
  lastName: string,
  profileImage: string,
  address: string,
  postCode: string,
  city: string,
  phoneNumber: string,
  birthDate: Date;
  about: string,
  id: number,
};


export function UserProfile() {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user info for ID: ${id}`);
        const response = await fetch(`https://borro.azurewebsites.net/api/User/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Fetching user failed", error);
        navigate('/error');
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Avatar
        alt="User Avatar"
        src={user.profileImage}
        sx={{width: 100, height: 100}}
      />
      {/* <Typography variant="h6">{user.email}</Typography> */}
      {/* Add other user details here */}
      <Button variant="contained" onClick={() => navigate(`/editUser/${user.id}`)}>
        Rediger profil
      </Button>
      <Button variant="contained" onClick={() => navigate(`/changePassword/${user.id}`)}>
        Endre passord
      </Button>
      <Typography variant='h5' gutterBottom>
        Navn
      </Typography>
      <Typography variant='h6' gutterBottom>

      </Typography>
    </Container>
  );
};
  