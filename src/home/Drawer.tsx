import {Button, Divider, Drawer, List, ListItem} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

export type DrawerMenuProps = {
  open: boolean;
  onClose: () => void
}

export function DrawerMenu(props: DrawerMenuProps) {

  return <>
    <Drawer
      anchor={"left"}
      open={props.open}
      onClose={props.onClose}>
      <List>

        <ListItem><Link to="/"><Button>Annonser</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Link to="/postCreate"><Button>Legg ut annonse</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Link to="/login"><Button>Lagret annonser</Button></Link></ListItem>
        <Divider orientation="horizontal"/>
        <ListItem><Link to="/login"><Button>Meldinger</Button></Link></ListItem>
        <Divider orientation="horizontal"/>


      </List>
    </Drawer>
  </>
}