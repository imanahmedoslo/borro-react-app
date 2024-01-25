import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Avatar, Box, Button, Container, Divider, Typography} from '@mui/material';
import {UploadPicture} from '../Post/UploadPicture';

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

	const customTheme = {
		display: 'flex',
		padding: "20px 0 10px 80px",
		flexDirection: 'row',

		justifyContent: 'left',
	};


	return (
		<Container component="main" maxWidth="sm">
			<Typography variant="h4" sx={{textAlign: "center"}} gutterBottom>
				Din bruker
			</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			<Avatar
				alt="User Avatar"
				src={user.userInfo.profileImage}
				sx={{width: 100, height: 100, textAlign: "center"}}
			/>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
			<UploadPicture Type={"userInfo"} Id={id} onPictureUploaded={onPictureUploaded}/>
			{/* <Typography variant="h6">{user.email}</Typography> */}
			{/* Add other user details here */}
-     </Box>
			<Box sx={{
				borderRadius: 2,
				border: '1px solid #ffffff',
				margin: "50px 0 0 0",

				padding: 2,
			}}>

				<Divider textAlign={"left"}>
					Navn
				</Divider>
				<Box sx={customTheme}>
					<Typography variant='h5' gutterBottom>
						{user.userInfo.firstName} {user.userInfo.lastName}
					</Typography>

				</Box>


				<Divider textAlign={"left"}>
					Telefon
				</Divider>

				<Box sx={customTheme}>

					<Typography variant='h5' gutterBottom>
						{user.userInfo.phoneNumber}
					</Typography>
				</Box>


				<Divider textAlign={"left"}>
					Adresse
				</Divider>
				<Box sx={customTheme}>

					<Typography variant='h5' gutterBottom>
						{user.userInfo.address}, {user.userInfo.postCode} {user.userInfo.city}
					</Typography>
				</Box>


				<Divider textAlign={"left"}>
					Fødselsdato
				</Divider>
				<Box sx={customTheme}>

					<Typography variant='h5' gutterBottom>
						{user.userInfo.birthDate
							? `${String(new Date(user.userInfo.birthDate).getDate()).padStart(2, '0')}-${
								String(new Date(user.userInfo.birthDate).getMonth() + 1).padStart(2, '0')}-${
								new Date(user.userInfo.birthDate).getFullYear()}`
							: 'Ikke tilgjengelig'}
					</Typography>
				</Box>

				<Divider textAlign={"left"}>
					Navn
				</Divider>
				<Box sx={customTheme}>

					<Typography variant='h5' gutterBottom>
						{user.userInfo.about}
					</Typography>
				</Box>
			</Box>
			<Divider/>
			<Box sx={{
				display: 'flex',
				padding: "50px 0 10px 0",
				flexDirection: 'row',
				justifyContent: 'space-evenly',
			}}>
				<Button variant="contained"
				        onClick={() => navigate(`/editUser/${user.id}`)}
				        size="large"
				>
					Rediger profil
				</Button>

				<Button variant="contained"
				        onClick={() => navigate(`/changePassword/${user.id}`)}
				        size="large"
				>
					Endre passord
				</Button>

			</Box>
		</Container>
	);
};
