import {Drawer} from "@mui/material";
import {useState} from "react";

export type DrawerMenuProps = {
	open: boolean;
	onClose: () => void
}
export function DrawerMenu(props : DrawerMenuProps) {


	return <>
		<Drawer
			BackdropProps={{invisible: true}}
			anchor={"left"}
			open={props.open}
			onClose={props.onClose}>
			{("Drawer")}
		</Drawer>
	</>
}