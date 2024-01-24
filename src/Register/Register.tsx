import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,  useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../Logo';
export type CreateUserType={
  Email:string,
  Password:string,
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const handlePassword=(password:string,repeatedPassword:string):boolean=>{
  if (password===repeatedPassword) {
    return true;
  }
  else return false;
 }
 const ValidateEmail=(email:string)=>{
  if (!email.includes("@")||!email.includes(".")) {
   return false
  }
  else {
    return true;
  } 
 }
 function generateObject(isCorrectEmail:boolean,PasswordsAlign:boolean, email:string,password:string):CreateUserType|null{
  if(isCorrectEmail&&PasswordsAlign){
    var userInfo:CreateUserType={Email:email,Password:password}
    return userInfo
  }
  else return null;
 }

 


async function CreateUser(userInfo:CreateUserType):Promise<number>{
  const response= await fetch(`https://borro.azurewebsites.net/api/Borro/user`, {method:'POST', headers:{'Content-Type':'application/json'} ,body:JSON.stringify(userInfo)});
  const statusCode= await response.status
return statusCode;
}

export default function Register() {
  const navigate = useNavigate();
 const [email,setEmail]=useState<string>("");
 const [password, setPassword]=useState<string>("")
 const [repeatedPassword,setRepeatedPassword]=useState<string>("");
 const [emailFormat,setEmailFormat]=useState<boolean>(true)
 const[passwordAligned,setPasswordAligned]=useState<boolean>(true)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPasswordsEqual = handlePassword(password,repeatedPassword);
    setPasswordAligned(isPasswordsEqual);
    const EmailIsValid= ValidateEmail(email)
    setEmailFormat(EmailIsValid);
    const userInfo=generateObject(isPasswordsEqual,EmailIsValid,email,password)
    if (userInfo!=null) {
      CreateUser(userInfo).then(code=> code<300?navigate('/login'):navigate('/error'));
      //this space here
    }
    else console.log("if test not accesed");

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <Logo height={70} width={70}/>
          <Typography component="h1" variant="h5">
            Registrer Bruker
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField onChange={e=>setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField value={password} onChange={e=>setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField value={repeatedPassword} onChange={e=>setRepeatedPassword(e.target.value)}
                  required
                  fullWidth
                  name="RepeatPassword"
                  label="RepeatPassword"
                  type="password"
                  id="RepeatPassword"
                  autoComplete="rpeated-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Vis passord"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrer
            </Button>
            <Grid item xs={12} sm={6}>
            {!passwordAligned&&<p style={{color:"red"}}> Passordene samsvarer ikke med hverandre!</p>}
            {!emailFormat&&<p style={{color:"red"}}> Email er ikke riktig formatert!</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <Link to={"/login"} style={{ flexGrow: 1 }}>
                 <p style={{color:"blue"}}> Har du allerede en bruker? Log in!</p>
                </Link>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}