import * as React from 'react';
import {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {DrawerMenu} from "./Drawer.tsx";
import {LoggedInIcon} from '../A/contextPage.tsx';
import {Link} from "react-router-dom";
import { useAuth } from '../App.tsx';
import { Navigate,useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Logo from '../Logo.tsx';


const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

export default function SearchAppBar({setSearchText}: { setSearchText: (text: string) => void }) {
  const navigate = useNavigate();
  const handleLogin=()=>{
    navigate('/login')
  }
  const { sessionInfo } = useAuth();
  const [state, setState] = useState({
    left: false,
  });

  const onClose = () => {
    setState(state => ({...state, left: false}));
  }

  const openDrawer = () => {
    setState(state => ({...state, left: true}));
  }
  const isLoggedIn = !!sessionInfo?.accessToken
  // const isLoggedIn: boolean = localStorage.getItem('logInStatus') === 'true' ? true : false

  return (
    <Box sx={{gridArea:"header"}}>
      <DrawerMenu open={state.left} onClose={onClose}/>
      <AppBar position="static" sx={{backgroundColor: "#293040"}}>
        <Toolbar>
          <IconButton
            onClick={openDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              '&:focus': {
                outline: 'none',
              },
            }}>
            <MenuIcon/>
          </IconButton>
          <Link to="/">
           <Logo height={40} width={'auto'}/>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
          </Typography>
          <Search sx={{mr: 2}}>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{'aria-label': 'search'}}
              onChange={event => setSearchText(event.target.value)} // update search text
            />
          </Search>
          {isLoggedIn ? <LoggedInIcon userId={sessionInfo.id}/>:<Button style={{textAlign: 'center', height: '50px', width:'auto', color:'white', backgroundColor:'#D5B263'}} variant="contained" onClick={handleLogin}>
           Logg inn
         </Button>}
        </Toolbar>
      </AppBar>

    </Box>
  );
}