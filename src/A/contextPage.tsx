import {Box, Button} from "@mui/material";
import {CreateUserType} from "../Register/Register";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useEffect, useState} from "react";
import '@fontsource/roboto/300.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../App";

export type TokenAndId = {
	accessToken: string,
	id: number,
	expiresAt: string,
	address: string,
	// isLoggedIn: boolean
}
export type ProfileType = {
	Id: number,
	firstName: string,
	lastName: string,
	profileImage: string,
	address: string,
	postCode: number,
	city: string
	phoneNumber: string
	birthDate: Date
	about: string,
	userId: number
}


export async function LoginFunctionality(userInfo: CreateUserType) {
//   const response = await fetch(`https://borro.azurewebsites.net/api/Login
// `, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userInfo)});
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   const responseJson = await response.json()
//   const LoginResponse: TokenAndId = {
//     accessToken: responseJson.accessToken,
//     Id: responseJson.id,
//     ExpiresAt: responseJson.ExpiresAt,
//     IsLoggedIn: true
//   }
//   localStorage.setItem('token', `${LoginResponse.accessToken}`)
//   localStorage.setItem('id', `${LoginResponse.Id}`)
//   localStorage.setItem('logInStatus', `${LoginResponse.IsLoggedIn}`)
//   localStorage.setItem('ExpiresAt', `${LoginResponse.ExpiresAt}`)
// 


// const sessionInfo: TokenAndId = {
	//   accessToken: localStorage.getItem('token') ?? "",
	//   id: parseInt(localStorage.getItem('id') ?? ""),
	// IsLoggedIn: localStorage.getItem('logInStatus') === 'true' ? true : false,
	//   expiresAt: localStorage.getItem('expiresAt') ?? ""
	// };
}

export async function getUser(userId: number) {
	const response = await fetch(`https://borro.azurewebsites.net/api/UserInfo/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
	});
	const object = await response.json();
	return object;
}

type Props = {
	userId: number
}

export function LoggedInIcon({userId}: Props) {
	const {onLogout} = useAuth();
	const navigate = useNavigate();
	const [profile, setProfile] = useState<ProfileType | null>()

	useEffect(() => {
		getUser(userId).then(res => setProfile(res));
	}, [])
	console.log(profile)

	if (profile) {
		return (
			<>
				<Box style={{
					display: 'flex',
					flexDirection: 'row',
				}}>
					{profile.profileImage == null ||
					profile.profileImage == "" ||
					profile.profileImage == undefined ?
						<AccountBoxIcon
							sx={{
								color: '#ffe3a9',
								height: '50px',
								width: '50px',
								transition: 'color 0.2s ease',
								"&:hover": {
									color: '#d5b263'
								}
							}}

							onClick={() => navigate(`/userProfile/${userId}`)}
						/> :
						<Box onClick={() => navigate(`/userProfile/${userId}`)}
						     component="img"
						     sx={{
								 borderRadius: '4px',
							     height: '33px',
							     margin: 'auto',
							     width: 'auto',
							     transition: 'transform 0.1s ease',
							     "&:hover": {

								     transform: 'scale(1.2)',
							     }
						     }} src={profile.profileImage}
						/>}


					{/*<Typography
						alignSelf={"flex-end"}
						my={1}
						component="div"

						mr={2}
						sx={{
							display: {xs: 'none', sm: 'block'},

						}}>
						{profile.firstName ?? 'Ola'}
					</Typography>*/}


					<Button sx={{
						textAlign: 'center',
						height: '36px',
						margin: 'auto',
						marginLeft: '10px',
						padding: '0 5px',
						width: 'auto',
						minWidth: '80px',
						color: 'white',
						backgroundColor: '#d5b263',
						transition: 'background-color 0.2s ease',
						"&:hover": {
							backgroundColor: '#a2874b'
						}
					}} variant="contained" onClick={onLogout}>
						Logg Ut
					</Button>

				</Box>
			</>
		)
	}
}


export async function getPosts() {
	const response = await fetch("https://borro.azurewebsites.net/api/Post",);
	return await response.json();
}