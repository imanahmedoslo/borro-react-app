import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Avatar, Button, Container, Typography} from '@mui/material';
import { UploadPicture } from '../Post/UploadPicture';
import { UserInfoForm } from '../Register/UserInfoForm';

type UserInfoType = {
  firstName: string,
  lastName: string,
  address: string,
  postCode: string,
  city: string,
  phoneNumber: string,
  birthDate: Date;
  about: string,
  id: number,
  userInfo: UserInfo
};

type UserInfo = {
  profileImage: string,
  firstName: string,
  lastName: string,
  address: string,
  postCode: string,
  city: string,
  phoneNumber: string,
  birthDate: Date;
  about: string,
}


export function UserProfile() {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const navigate = useNavigate();
  const {id} = useParams();

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
      console.log("userData: ", userData)
    } catch (error) {
      console.error("Fetching user failed", error);
      navigate('/error');
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const onPictureUploaded = () => {
    fetchUser();
  }


  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Din bruker
      </Typography>
      <Avatar
        alt="User Avatar"
        src={user.userInfo.profileImage}
        sx={{width: 100, height: 100}}
      />
      <UploadPicture Type={"userInfo"} Id={id} onPictureUploaded={onPictureUploaded} />
      {/* <Typography variant="h6">{user.email}</Typography> */}
      {/* Add other user details here */}
      <Button variant="contained" onClick={() => navigate(`/editUser/${user.id}`)}>
        Rediger profil
      </Button>
      <Button variant="contained" onClick={() => navigate(`/changePassword/${user.id}`)}>
        Endre passord
      </Button>
      <Typography variant='h5' gutterBottom>
        Navn: {user.userInfo.firstName} {user.userInfo.lastName}
      </Typography>
      <Typography variant='h5' gutterBottom>
        Telefon: {user.userInfo.phoneNumber}
      </Typography>
      <Typography variant='h5' gutterBottom>
        Adresse: {user.userInfo.address}, {user.userInfo.postCode} {user.userInfo.city}
      </Typography>
      <Typography variant='h5' gutterBottom>
        Fødselsdato: {
          user.userInfo.birthDate 
          ? `${String(new Date(user.userInfo.birthDate).getDate()).padStart(2, '0')}-${
            String(new Date(user.userInfo.birthDate).getMonth() + 1).padStart(2, '0')}-${
            new Date(user.userInfo.birthDate).getFullYear()}`
          : 'Ikke tilgjengelig'
          }</Typography>
      <Typography variant='h5' gutterBottom>
        Bio: {user.userInfo.about}
      </Typography>
    </Container>
  );
};
  