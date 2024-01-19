
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Logo from '../Logo';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ForkRight, Home } from '@mui/icons-material';
import { CreateUserType } from '../Register/Register';
import { Context } from '@popperjs/core';

type TokenAndId={
  accessToken:string,
  Id:number
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
/*async function LoginFunctionality(userInfo:CreateUserType){
const response= await fetch(`http://localhost:5066/api/Login`, {method:'POST', headers:{'Content-Type':'application/json'} ,body:JSON.stringify(userInfo)});
if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
 const responseJson=  await response.json()
const LoginResponse:TokenAndId={
  accessToken:responseJson.accessToken,
  Id:responseJson.id
}
return LoginResponse
}*/
type LoginProps={
  LoginFunctionality:(userInfo:CreateUserType)=>Promise<void>
}

export default function LogIn({LoginFunctionality}:LoginProps) {
  const navigate = useNavigate();
  const [email,setEmail]=useState<string>("");
 const [password, setPassword]=useState<string>("")
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo:CreateUserType={Email:email,Password:password}
    LoginFunctionality(userInfo).then(response=> navigate('/'))
  };

  return (
    <>
    
      <Container component="main" maxWidth="xs">
      
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Logo height={70}width={70}/>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              onChange={e=>setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={e=>setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Stack spacing={{xs:1, sm: 2}} direction='row' alignItems="center">
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2}}
              >
              Sign In
            </Button>
            <Link to={"/register"} style={{ flexGrow: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              >
              Register
            </Button>
            </Link>
            
            </Stack>

            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
     
    </>
  );
}