import './App.css'
import {Home} from "./home/Home.tsx";
//import Register from './assets/Register/Register'
import LogIn from './logIn/logIn'
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {Link} from "react-router-dom";
import { Button } from '@mui/material';
import {PlanetDetail} from "./examples/PlanetDetail.tsx";
import {PlanetList} from "./examples/PlanetList.tsx";
import SearchAppBar from "./home/Search.tsx";
import Register from './Register/Register.tsx';
import PostCreate from './PostPage/PostCreate.tsx';


type ProtectedRouteProps = {
	children?: JSX.Element;

}

function ProtectedRoute(props: ProtectedRouteProps) {
	const isLoggedIn = true;
	//const navigate = useNavigate();

		if (!isLoggedIn) {
			return <Navigate to="/login"/>
		}


	return <>
	{props.children}
	</>
}

function App() {

	return (
		<>
			<BrowserRouter>
				<div>
					<SearchAppBar/>
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
					<Route path={"/login"} element={<ProtectedRoute><LogIn/></ProtectedRoute>}></Route>
					<Route path={"/register"} element={<Register/>}></Route>
					<Route path={"/planets"} element={<PlanetList/>}></Route>
					<Route path={"/planets/:planetId"} element={<PlanetDetail/>}></Route>
					<Route path={"/postCreate"}element={<PostCreate/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
