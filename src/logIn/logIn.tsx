import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../Logo';
import {Link, useNavigate} from 'react-router-dom';
import {CreateUserType} from '../Register/Register';
import {Checkbox, FormControlLabel} from '@mui/material';
import {useAuth} from '../App';

export default function LogIn() {
  const navigate = useNavigate();
  const {sessionInfo, onLogin} = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo: CreateUserType = {Email: email, Password: password}
    try {
      onLogin(userInfo)
    } catch {
      console.error("could not log in");
    }

  };
  return (
    <>

      <Container component="main"
                 maxWidth="xs"
                 sx={{
                 }}>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo height={40} width={"auto"}/>
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
