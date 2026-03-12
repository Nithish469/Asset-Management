import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

return (

<Drawer
variant="permanent"
sx={{
width:240,
flexShrink:0,
"& .MuiDrawer-paper":{
width:240,
background:"#1f2a40",
color:"#fff"
}
}}
>

<h2 style={{padding:"20px"}}>Admin</h2>

<List>

<ListItem button component={NavLink} to="/dashboard"
sx={{"&.active":{background:"#2a3a5e"}}}>
<ListItemIcon sx={{color:"#fff"}}>
<DashboardIcon/>
</ListItemIcon>
<ListItemText style={{color:"#fff"}} primary="Dashboard"/>
</ListItem>

<ListItem button component={NavLink} to="/employees"
sx={{"&.active":{background:"#2a3a5e"}}}>
<ListItemIcon sx={{color:"#fff"}}>
<PeopleIcon/>
</ListItemIcon>
<ListItemText style={{color:"#fff"}} primary="Employees"/>
</ListItem>

<ListItem button component={NavLink} to="/assets"
sx={{"&.active":{background:"#2a3a5e"}}}>
<ListItemIcon sx={{color:"#fff"}}>
<DevicesIcon/>
</ListItemIcon>
<ListItemText style={{color:"#fff"}} primary="Assets"/>
</ListItem>

<ListItem button component={NavLink} to="/assignments"
sx={{"&.active":{background:"#2a3a5e"}}}>
<ListItemIcon sx={{color:"#fff"}}>
<AssignmentIcon/>
</ListItemIcon>
<ListItemText style={{color:"#fff"}} primary="Assignments"/>
</ListItem>

</List>

</Drawer>

);

};

export default Sidebar;