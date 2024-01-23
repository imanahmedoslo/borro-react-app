import './App.css'
import {Home} from "./home/Home.tsx";
import LogIn from './logIn/logIn.tsx'
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from '@mui/material';
import SearchAppBar from "./home/Search.tsx";
import Register from './Register/Register.tsx';
import PostCreate from './Post/PostCreate.tsx';
import {ViewPost, postProps} from './Post/ViewPost.tsx';
import {UserInfoForm} from './Register/UserInfoForm.tsx';
import {LoginFunctionality} from './A/contextPage.tsx';
import {LocationDistance} from "./GoogleAPI/Maps.tsx";
import {LoadScript} from "@react-google-maps/api";



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
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');

  function ProtectedRoute(props: ProtectedRouteProps) {
    const isLoggedIn = localStorage.getItem('logInStatus') === 'true' ? true : false;
    //const navigate = useNavigate();
    if (isLoggedIn) {
      return <Navigate to="/"/>
    }
    return <>
      {props.children}
    </>
  }


  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyBRA8VU6f0Ciqy3aa5-JCQlS4TEqliQECs"
        libraries={libraries}
        onLoad={() => setMapsLoaded(true)}>
      </LoadScript>
      <SearchContext.Provider value={{searchText, setSearchText}}>
        <BrowserRouter>
          <SearchAppBar setSearchText={setSearchText}/>
          <Routes>
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/login"}
                   element={
                     <ProtectedRoute>
                       <LogIn LoginFunctionality={LoginFunctionality}/>
                     </ProtectedRoute>}>
            </Route>
            <Route path={"/register"} element={<Register/>}></Route>
            <Route path={"/postCreate"} element={<PostCreate/>}></Route>
            <Route path={"/post/:postId"} element={<ViewPost/>}></Route>
            <Route path={"/userInfo/:userId"} element={<UserInfoForm/>}></Route>
          <Route path={"/userProfile/:id"} element={<UserProfile/>}></Route>
						<Route path={"/editUser/:id"} element={<EditUserProfile/>}></Route>
						<Route path={"/changePassword/:id"} element={<ChangePassword/>}></Route>
					</Routes>
        </BrowserRouter>
      </SearchContext.Provider>
    </>
  )
}

export default App