import './App.css'
import {Home} from "./home/Home.tsx";
import LogIn from './logIn/logIn.tsx'
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchAppBar from "./home/Search.tsx";
import Register, {CreateUserType} from './Register/Register.tsx';
import PostCreate from './Post/PostCreate.tsx';
import {ViewPost} from './Post/ViewPost.tsx';
import {UserInfoForm} from './Register/UserInfoForm.tsx';
import {TokenAndId} from './A/contextPage.tsx';
import {LoadScript} from "@react-google-maps/api";
import {UserProfile} from "./user/UserProfile.tsx";
import {EditUserProfile} from "./user/EditUserProfile.tsx";
import {ChangePassword} from "./user/ChangePassword.tsx";
import {MyPosts} from './Post/MyPosts.tsx';
import {jwtDecode} from 'jwt-decode'
import {Footer} from "./Footer/Footer.tsx";
import {Box} from "@mui/material";


type LoginResponse = {
  accessToken: string,
  expiresAt: string,
}

const AuthContext = React.createContext<{
  sessionInfo: TokenAndId | null;
  onLogin: (user: CreateUserType) => void;
  onLogout: () => void;
} | null>(null);

export const useAuth = () => {
  const d = React.useContext(AuthContext);
  if (!d) {
    throw new Error();
  }

  return d;
}

type AuthProviderProps = {
  children?: JSX.Element;
}
type DecodedJwtPayload = {
  address: string;
  id: string;
  exp: number;
  iss: string;
  aud: string;
}
type decodedInfo = {
  address: string,
  id: number,
}

function DecodeToken(): decodedInfo {
  const token = localStorage.getItem('token') ?? "";
  const decoded = jwtDecode<DecodedJwtPayload>(token);
  const result: decodedInfo = {
    address: decoded.address,
    id: parseInt(decoded.id)
  }
  return result;
}


const AuthProvider = ({children}: AuthProviderProps) => {
  const [sessionInfo, setSessionInfo] = useState<TokenAndId | null>(null);
  const [decoded, setDecoded] = useState<decodedInfo | null>(null)
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedInfo = DecodeToken();
      const sessionInfoFromLs: TokenAndId = {
        accessToken: localStorage.getItem('token') ?? "",
        id: decodedInfo?.id ?? 0,
        // IsLoggedIn: localStorage.getItem('logInStatus') === 'true' ? true : false,
        expiresAt: localStorage.getItem('expiresAt') ?? "",
        address: decodedInfo?.address ?? ""
      };
      setSessionInfo(sessionInfoFromLs);
    }


  }, [localStorage.getItem('token')])

  const handleLogin = async (userInfo: CreateUserType) => {
    const response = await fetch(`https://borro.azurewebsites.net/api/Login
`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userInfo)});
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json()
    const LoginResponse: LoginResponse = {
      accessToken: responseJson.accessToken,
      expiresAt: responseJson.expiresAt,
      // IsLoggedIn: true
    }
    localStorage.setItem('token', `${LoginResponse.accessToken}`)
    // localStorage.setItem('logInStatus', `${LoginResponse.IsLoggedIn}`)
    localStorage.setItem('expiresAt', `${LoginResponse.expiresAt}`)
    navigate('/');
  }

  const handleLogout = () => {
    localStorage.clear();
    setSessionInfo(null);
    navigate('/');
  }

  const value = {
    sessionInfo,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


type ProtectedRouteProps = {
  children?: JSX.Element;

}
export const SearchContext = React.createContext<{
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchText: '',
  setSearchText: () => {
  },
});


type Library = "geometry";
const libraries: Library[] = ["geometry"];

function App() {
  //const [sessionInfo, setSessionInfo] = useState(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');


  function ProtectedRoute(props: ProtectedRouteProps) {
    const {sessionInfo} = useAuth()
    if (!sessionInfo?.accessToken && !localStorage.getItem('token')) {
      return <Navigate to="/login"/>
    }
    return <>
      {props.children}
    </>
  }


  return (
    <Box sx={{
      minHeight: "100vh",
      gridTemplateAreas: "header main footer",
      display: "flex",
      flexDirection: "column",
    }}>
      <LoadScript
        googleMapsApiKey="AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs"
        libraries={libraries}
        onLoad={() => setMapsLoaded(true)}/>

      <SearchContext.Provider value={{searchText, setSearchText}}>
        <BrowserRouter>
          <AuthProvider>
            <>
              <SearchAppBar setSearchText={setSearchText}/>
              <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/login"} element={<LogIn/>}>
                </Route>
                <Route path={"/register"} element={<Register/>}></Route>
                <Route path={"/postCreate"} element={
                  <ProtectedRoute>
                    <PostCreate/>
                  </ProtectedRoute>}>
                </Route>
                <Route path={"/post/:postId"} element={<ViewPost/>}></Route>
                <Route path={"/post/:postId"} element={<ViewPost/>}></Route>
                <Route path={"/posts/:postId"} element={
                  <ProtectedRoute>
                    <MyPosts/>
                  </ProtectedRoute>
                }></Route>
                <Route path={"/createUserInfo/:userId"} element={
                  <ProtectedRoute>
                    <UserInfoForm/>
                  </ProtectedRoute>}>
                </Route>
                <Route path={"/userProfile/:id"} element={
                  <ProtectedRoute>
                    <UserProfile/>
                  </ProtectedRoute>}>
                </Route>
                <Route path={"/editUser/:id"} element={
                  <ProtectedRoute>
                    <EditUserProfile/>
                  </ProtectedRoute>}>
                </Route>
                <Route path={"/changePassword/:id"} element={
                  <ProtectedRoute>
                    <ChangePassword/>
                  </ProtectedRoute>}>
                </Route>
              </Routes>
            </>
          </AuthProvider>

        </BrowserRouter>
      </SearchContext.Provider>
      <Footer/>
    </Box>
  )
}


export default App