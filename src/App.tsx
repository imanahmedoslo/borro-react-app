import './App.css'
import {Home} from "./home/Home.tsx";
//import Register from './assets/Register/Register'
import LogIn from './logIn/logIn.tsx'
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import {Link} from "react-router-dom";
import { Button } from '@mui/material';
import {PlanetDetail} from "./examples/PlanetDetail.tsx";
import {PlanetList} from "./examples/PlanetList.tsx";
import SearchAppBar from "./home/Search.tsx";
import Register from './Register/Register.tsx';
import PostCreate from './Post/PostCreate.tsx';
import { ViewPost, postProps } from './Post/ViewPost.tsx';
//import Calender from './Post/PostCreateCalender.tsx';
import { Token } from '@mui/icons-material';
import { LoginFunctionality } from './A/contextPage.tsx';


type ProtectedRouteProps = {
	children?: JSX.Element;

}


function App() {
//const[tokenId,setTokenId]=useState<TokenAndId>({accessToken:"",Id:0, ExpiresAt:0})

function ProtectedRoute(props: ProtectedRouteProps) {
	const isLoggedIn= localStorage.getItem('logInStatus')==='true'?true:false;
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
			<BrowserRouter>
				<div>
					<div>
						<Link to={"/"} ><Button>Home</Button></Link>
					</div>
					<div>
						<Link to={"/login"}><Button>Login</Button></Link>
					</div>
					<div>
						<Link to={"/planets"}><Button>Planet</Button></Link>
					</div>
					<div>
						<Link to={"/postCreate"}><Button> post an add </Button></Link>
					</div>
				</div>
				<Routes>
					<Route path={"/"} element={<Home/>}></Route>
					<Route path={"/login"} element={<ProtectedRoute><LogIn LoginFunctionality={LoginFunctionality}/></ProtectedRoute>}></Route>
					<Route path={"/register"} element={<Register/>}></Route>
					<Route path={"/planets"} element={<PlanetList/>}></Route>
					<Route path={"/planets/:planetId"} element={<PlanetDetail/>}></Route>
					<Route path={"/postCreate"}element={<PostCreate/>}></Route>
					<Route path={"/post/:postId"}element={<ViewPost />}></Route>
					
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App


//<Route path={"/Calendar"}element={<Calender/>}></Route>