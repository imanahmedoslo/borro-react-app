import {Button, Divider, Drawer, List, ListItem} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import { useAuth } from "../App";
import { useNavigate,Navigate } from "react-router-dom";

export type DrawerMenuProps = {
  open: boolean;
  onClose: () => void
}

export function DrawerMenu(props: DrawerMenuProps) {
  const{sessionInfo}=useAuth()
  const navigate=useNavigate()

  return <>
    <Drawer
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: "#FBF7EF",
        },
      }}
      anchor={"left"}
      open={props.open}
      onClose={props.onClose}>
      <List>

        <ListItem><Link to="/"><Button>Annonser</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Link to="/postCreate"><Button>Legg ut annonse</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Link to="/posts/:postId"><Button>Mine annonser</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Link to="/"><Button>Meldinger</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Button style={{backgroundColor:'#FBF7EF', border:'none', color:'#1976D2', boxShadow:'none', textAlign:'start', paddingLeft:'0px'}} variant="contained" onClick={() => navigate(`/createUserInfo/${sessionInfo?.id}`)}>
        Lag bruker profil
      </Button></ListItem>
        <Divider orientation="horizontal"/>

      </List>
    </Drawer>
  </>
}