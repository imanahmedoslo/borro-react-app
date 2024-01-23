import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme} from '@mui/material/styles';
import Logo from '../Logo';
import {Link, useNavigate} from 'react-router-dom';
import {CreateUserType} from '../Register/Register';
import {TokenAndId} from '../A/contextPage';
import {Checkbox, FormControlLabel} from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
/*async function LoginFunctionality(userInfo:CreateUserType){
const response= await fetch(`https://borro.azurewebsites.net/api/Login`, {method:'POST', headers:{'Content-Type':'application/json'} ,body:JSON.stringify(userInfo)});
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
type LoginProps = {
  LoginFunctionality: (userInfo: CreateUserType) => Promise<void>
}

export default function LogIn({LoginFunctionality}: LoginProps) {
  const sessionInfo: TokenAndId = {
    accessToken: localStorage.getItem('token') ?? "",
    Id: parseInt(localStorage.getItem('id') ?? ""),
    IsLoggedIn: localStorage.getItem('logInStatus') === 'true' ? true : false,
    ExpiresAt: localStorage.getItem('ExpiresAt') ?? ``
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo: CreateUserType = {Email: email, Password: password}
    try {
      LoginFunctionality(userInfo).then(response => navigate('/'))
    } catch {
      console.error("could not log in");
    }
    ;

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
          <Logo height={70} width={70}/>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
            <TextField
              margin="normal"
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
            />

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="" color="primary"
                  //onChange={() => setShowPassword(!showPassword)}/>
                                   onChange={e => setShowPassword(e.target.checked ? true : false)}/>

                }
                label="Vis passord"
              />
            </Grid>

            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 4, mb: 2}}
              >
                Sign In
              </Button>
              <Link to={"/register"}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 4, mb: 2}}
                >
                  Register
                </Button>
              </Link>

            </div>

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
// style={{ flexGrow: 1 }}
// {{sm: 1}} direction='row' alignItems="center">