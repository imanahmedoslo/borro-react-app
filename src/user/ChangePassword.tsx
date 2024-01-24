import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import React, { useState } from "react";
import Logo from "../Logo";


const defaultTheme = createTheme();


const handlePassword=(password:string,repeatedPassword:string):boolean=>{
  if (password===repeatedPassword) {
    return true;
  }
  else return false;
 }



 export function ChangePassword() {
    const [gammeltPassord, setgammeltPassord] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [passwordAligned, setPasswordAligned] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
  
    const handlePassword = (password: string, repeatedPassword: string): boolean => {
      return password === repeatedPassword;
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isPasswordsEqual = handlePassword(password, repeatedPassword);
      setPasswordAligned(isPasswordsEqual);
    };
        return (
            <>
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
            Endre passord
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Grid item xs={12}>
                <TextField value={gammeltPassord} onChange={e=>setgammeltPassord(e.target.value)}
                  required
                  fullWidth
                  name="gammelyPassord"
                  label="gammelt passord"
                  type={showPassword ? "text" : "password" }
                  id="gammeltPassord"
                  autoComplete="gammeltPassord"
                />
              </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField value={password} onChange={e=>setPassword(e.target.value)}
                  required
                  fullWidth
                  name="nyttPassord"
                  label="nytt Passord"
                  type={showPassword ? "text" : "password" }
                  id="nyttPassord"
                  autoComplete="nyttPassord"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField value={repeatedPassword} onChange={e=>setRepeatedPassword(e.target.value)}
                  required
                  fullWidth
                  name="gjentaPassord"
                  label="gjenta Passord"
                  type={showPassword ? "text" : "password" }
                  id="gjentaPassord"
                  autoComplete="gjentaPassord"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary"
                  onChange={e=>setShowPassword(e.target.checked?true:false)} />}
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
              Bytt Passord
            </Button>
            <Grid item xs={12} sm={6}>
            {!passwordAligned&&<p style={{color:"red"}}> Passordene samsvarer ikke med hverandre!</p>}
           
              </Grid>
              <Grid item xs={12} sm={6}>
              
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>



    </> )
};
