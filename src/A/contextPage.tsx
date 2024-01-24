import {Button} from "@mui/material";
import {CreateUserType} from "../Register/Register";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import {useNavigate} from "react-router-dom";
import { useAuth } from "../App";

export type TokenAndId = {
  accessToken: string,
  id: number,
  expiresAt: string,
  address:string,
  // isLoggedIn: boolean
}
export type ProfileType = {
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
    headers: {'Content-Type': 'application/json'}
  });
  const object = await response.json();
  return object;
}

type Props = {
  userId: number
}

export function LoggedInIcon({userId}: Props) {
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>()

  useEffect(() => {
    getUser(userId).then(res => setProfile(res));
  }, [])

  if (profile) {
    return (
      <>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <AccountBoxIcon style={{color: '#FBF7EF', height: '50px', width: '50px'}}
                          onClick={() => navigate(`/userProfile/${userId}`)}/>

          <Typography gutterBottom variant="h4" component="div" marginY={"auto"} mr={2}>
            {profile.firstName ?? 'Ola'}
          </Typography>

          <Button style={{textAlign: 'center', height: '50px'}} variant="contained" onClick={onLogout}>
            Logg ut
          </Button>
        </div>
      </>
    )
  }
}

export async function getPosts() {
  const response = await fetch("https://borro.azurewebsites.net/api/Post");
  return await response.json();
}