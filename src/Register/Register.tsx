import * as React from "react";
import { useState } from "react";
//import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";

type UserInfoType = {
  firstName: string;
  lastName: string;
  profileImage: string | null;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  birthDate: string | null;
  about: string | null;
  userId: number;
};

export type CreateUserType = {
  Email: string;
  Password: string;
};
type CreateAccountType = {
  Email: string;
  Password: string;
  FirstName: string;
};
type createUserResponseType = {
  userId: number;
  userInfoId: number;
  FirstName: string;
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const handlePassword = (
  password: string,
  repeatedPassword: string,
): boolean => {
  if (password === repeatedPassword) {
    return true;
  } else {
    return false;
  }
};
const ValidateEmail = (email: string) => {
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  } else {
    return true;
  }
};

function generateObject(
  isCorrectEmail: boolean,
  PasswordsAlign: boolean,
  email: string,
  password: string,
  firstName: string,
): CreateAccountType | null {
  if (isCorrectEmail && PasswordsAlign) {
    var userInfo: CreateAccountType = {
      Email: email,
      Password: password,
      FirstName: firstName,
    };
    return userInfo;
  } else {
    return null;
  }
}

async function CreateUser(userInfo: CreateAccountType): Promise<number> {
  const response = await fetch(`https://borroapp.azurewebsites.net/api/User`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });
  const statusCode = await response.status;
  const responeJson: createUserResponseType = await response.json();
  return statusCode;
}

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [emailFormat, setEmailFormat] = useState<boolean>(true);
  const [passwordAligned, setPasswordAligned] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [firstName, setFristName] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPasswordsEqual = handlePassword(password, repeatedPassword);
    setPasswordAligned(isPasswordsEqual);
    const EmailIsValid = ValidateEmail(email);
    setEmailFormat(EmailIsValid);
    const userInfo = generateObject(
      isPasswordsEqual,
      EmailIsValid,
      email,
      password,
      firstName,
    );
    if (userInfo != null) {
      CreateUser(userInfo).then((code) =>
        code < 300 ? navigate("/login") : navigate("/error"),
      );
      //this space here
    } else {
      //console.log("if test not accesed");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo height={40} width={"auto"} />
          <Typography component="h1" variant="h5" paddingTop="1em">
            Registrer Bruker
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Epost"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setFristName(e.target.value)}
                  required
                  fullWidth
                  id="firstName"
                  label="Fornavn"
                  name="firstName"
                  autoComplete="firstName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Passord"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  required
                  fullWidth
                  name="RepeatPassword"
                  label="Gjenta Passord"
                  type={showPassword ? "text" : "password"}
                  id="RepeatPassword"
                  autoComplete="rpeated-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onChange={(e) =>
                        setShowPassword(e.target.checked ? true : false)
                      }
                    />
                  }
                  label="Vis passord"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#D5B263" }}
            >
              Registrer
            </Button>
            <Grid item xs={12} sm={6}>
              {!passwordAligned && (
                <p style={{ color: "red" }}>
                  {" "}
                  Passordene samsvarer ikke med hverandre!
                </p>
              )}
              {!emailFormat && (
                <p style={{ color: "red" }}> Email er ikke riktig formatert!</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to={"/login"} style={{ flexGrow: 1 }}>
                <p style={{ color: "blue" }}>
                  {" "}
                  Har du allerede en bruker? Logg inn!
                </p>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
