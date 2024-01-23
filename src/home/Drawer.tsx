import {Button, Divider, Drawer, List, ListItem} from "@mui/material";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export type DrawerMenuProps = {
	open: boolean;
	onClose: () => void
}
export function DrawerMenu(props : DrawerMenuProps) {

	return <> 
		<Drawer
			anchor={"left"}
			open={props.open}
			onClose={props.onClose}>
			<List>

				<ListItem><Link to="/"><Button>Home</Button></Link></ListItem>
				<Divider orientation="horizontal"/>

				<ListItem><Link to="/login"><Button>Login</Button></Link></ListItem>
				<Divider orientation="horizontal"/>
				<ListItem><Link to="/postCreate"><Button>post an add</Button></Link></ListItem>

			</List>
		</Drawer>
	</>
}