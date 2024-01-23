import {Button} from "@mui/material";
import {CreateUserType} from "../Register/Register";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import {useNavigate} from "react-router-dom";

export type TokenAndId = {
	accessToken: string,
	Id: number,
	ExpiresAt: string,
	IsLoggedIn: boolean
}
type ProfileType = {
	Id: number,
	firstName: string,
	LastName: string,
	ProfileImage: string,
	Address: string,
	PostCode: number,
	City: string
	PhoneNumber: string
	BirthDate: Date
	About: string,
	UserId: number
}

export async function LoginFunctionality(userInfo: CreateUserType) {
	const response = await fetch(`https://borro.azurewebsites.net/api/Login
`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userInfo)});
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const responseJson = await response.json()
	const LoginResponse: TokenAndId = {
		accessToken: responseJson.accessToken,
		Id: responseJson.id,
		ExpiresAt: responseJson.ExpiresAt,
		IsLoggedIn: true
	}
	localStorage.setItem('token', `${LoginResponse.accessToken}`)
	localStorage.setItem('id', `${LoginResponse.Id}`)
	localStorage.setItem('logInStatus', `${LoginResponse.IsLoggedIn}`)
	localStorage.setItem('ExpiresAt', `${LoginResponse.ExpiresAt}`)
	console.log(response)
}

export async function getUser() {
	const sessionInfo: TokenAndId = {
		accessToken: localStorage.getItem('token') ?? "",
		Id: parseInt(localStorage.getItem('id') ?? ""),
		IsLoggedIn: localStorage.getItem('logInStatus') === 'true' ? true : false,
		ExpiresAt: localStorage.getItem('ExpiresAt') ?? ""
	};
	const response = await fetch(`https://borro.azurewebsites.net/api/UserInfo/${sessionInfo.Id}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});
	const object = await response.json();
	return object;
}

export function LogedInIcon() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState<ProfileType | null>()
	useEffect(() => {
		getUser().then(res => setProfile(res));
	}, [])

	function handleLogOut() {
		localStorage.clear();
		setProfile(null);
		navigate('/');
	}

	if (profile) {
		return (
			<>
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<AccountBoxIcon sx={{mr: 2}} style={{color: 'blue', height: '50px', width: '50px'}}/>

					<Typography gutterBottom variant="h4" component="div">
						{profile.firstName ?? 'novalue'}
					</Typography>

					<Button style={{textAlign: 'center', height: '50px'}} variant="contained" onClick={handleLogOut}>
						Logg ut
					</Button>
				</div>
			</>
		)
	}
}