import React, { useState } from "react";
import Logo from "../Logo";
import { defaultTheme } from "react-select";
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../App";


type user = {
    id: number;
}

export function ChangePassword() {
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [passwordAligned, setPasswordAligned] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {sessionInfo}=useAuth();
    const navigate = useNavigate();

    const {id} = useParams<{ id: string }>();
    const userId = id ? parseInt(id, 10) : 0;
    console.log('Retrieved user ID from URL:', id);
  
    const handlePassword = (newPassword: string, repeatedPassword: string): boolean => {
      return newPassword === repeatedPassword;
    };
  
    const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isPasswordsEqual = handlePassword(newPassword, repeatedPassword);
      setPasswordAligned(isPasswordsEqual);
      handleIdSubmit()
    };

    const handleIdSubmit = async () => {
        try {
          const response = await fetch(`https://borro.azurewebsites.net/api/User/changePassword/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionInfo?.accessToken}`,
            },

            // SJEKK SYNTAKSEN PÅ HVORDAN MAN SENDER INN TING SOM JSON. Anførselstegn?Kolon?Erliktegn?
            body: JSON.stringify({newPassword:
                newPassword, oldPassword:password
            }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
    
           navigate(`/`);
        } catch (error) {
          console.error("Updating user info failed", error);
        }
      };

    return (
      <>
        
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
              <Logo height={70} width={70} />
              <Typography component="h1" variant="h5">
                Endre passord
              </Typography>
              <Box component="form" noValidate onSubmit={handlePasswordSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      fullWidth
                      name="password"
                      label="gammelt passord"
                      type={showPassword ? "text" : "Password"}
                      id="password"
                      autoComplete="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      fullWidth
                      name="newPassord"
                      label="nytt Passord"
                      type={showPassword ? "text" : "Password"}
                      id="newPassord"
                      autoComplete="newPassord"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={repeatedPassword}
                      onChange={(e) => setRepeatedPassword(e.target.value)}
                      required
                      fullWidth
                      name="repeatedPassord"
                      label="gjenta Passord"
                      type={showPassword ? "text" : "Password"}
                      id="repeatedPassord"
                      autoComplete="repeatedPassord"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="secondary" onChange={(e) => setShowPassword(e.target.checked ? true : false)} />}
                      label="Vis passord"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{backgroundColor:"#D5B263", color:'white'}}
                
                >
                  Bytt Passord
                </Button>
                <Grid item xs={12} sm={6}>
                  {!passwordAligned && <p style={{ color: "red" }}> Passordene samsvarer ikke med hverandre!</p>}
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Box>
            </Box>
          </Container>
    
      </>
    );
  }
  