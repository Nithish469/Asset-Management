import React, { useState } from "react";
import {
AppBar,
Toolbar,
Typography,
IconButton,
Menu,
MenuItem
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {

const [anchorEl, setAnchorEl] = useState(null);

const handleMenu = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};

const handleLogout = () => {
localStorage.removeItem("token");
window.location.href = "/";
};

return (

<AppBar
position="fixed"
sx={{
ml:"240px",
width:"calc(100% - 240px)",
background:"#fff",
color:"#000",
boxShadow:1,
zIndex:1201
}}
>

<Toolbar>

<Typography variant="h6" sx={{flexGrow:1}}>
Asset Management System
</Typography>

<IconButton
size="large"
edge="end"
color="inherit"
onClick={handleMenu}
>

<AccountCircleIcon fontSize="large"/>

</IconButton>

<Menu
anchorEl={anchorEl}
open={Boolean(anchorEl)}
onClose={handleClose}
>

<MenuItem onClick={handleClose}>
Profile
</MenuItem>

<MenuItem onClick={handleLogout}>
Logout
</MenuItem>

</Menu>

</Toolbar>

</AppBar>

);

};

export default Navbar;