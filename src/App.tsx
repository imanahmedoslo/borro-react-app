import './App.css'
import {Home} from "./home/Home.tsx";
import LogIn from './logIn/logIn.tsx'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import SearchAppBar from "./home/Search.tsx";
import Register from './Register/Register.tsx';
import PostCreate from './Post/PostCreate.tsx';
import {ViewPost} from './Post/ViewPost.tsx';
import {UserInfoForm} from './Register/UserInfoForm.tsx';
import {LoginFunctionality} from './A/contextPage.tsx';
import {LocationDistance} from "./GoogleAPI/Maps.tsx";
import { MyPosts } from './Post/MyPosts.tsx';
import {LoadScript} from "@react-google-maps/api";
import {UserProfile} from "./user/UserProfile.tsx";
import {EditUserProfile} from "./user/EditUserProfile.tsx";
import {ChangePassword} from "./user/ChangePassword.tsx";


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
    if (!isLoggedIn) {
      return <Navigate to="/login"/>
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
        onLoad={() => setMapsLoaded(true)}/>

      <SearchContext.Provider value={{searchText, setSearchText}}>
        <BrowserRouter>
          <SearchAppBar setSearchText={setSearchText}/>
          <Routes>
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/login"} element={<LogIn LoginFunctionality={LoginFunctionality}/>}>
            </Route>
            <Route path={"/register"} element={<Register/>}></Route>
            <Route path={"/postCreate"} element={
              <ProtectedRoute>
                <PostCreate/>
              </ProtectedRoute>}>
            </Route>
            <Route path={"/post/:postId"} element={<ViewPost/>}></Route>
            <Route path={"/userInfo/:userId"} element={
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
        </BrowserRouter>
      </SearchContext.Provider>
    </>
  )
	return (
		<>
			<LocationDistance/>
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
						<Route path={`/posts/:userId`} element={<MyPosts/>}></Route>
					</Routes>
				</BrowserRouter>
			</SearchContext.Provider>
		</>
	)
}

export default App