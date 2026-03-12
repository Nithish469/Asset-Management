import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
Box,
Paper,
TextField,
Button,
Typography,
IconButton,
InputAdornment
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import loginImage from "../assets/asset-login.jpeg";

const Login = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate();

const handleLogin = async () => {

try {

const res = await axios.post(
"http://localhost:5000/api/admin/login",
{
email: username,
password: password
}
);

localStorage.setItem("token", res.data.token);

navigate("/dashboard");

} catch (error) {

alert("Invalid Username or Password");

}

};

return (

<Box
sx={{
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#f4f6fb"
}}
>

<Paper
elevation={6}
sx={{
display: "flex",
width: 850,
borderRadius: 3,
overflow: "hidden"
}}
>

{/* LEFT IMAGE */}

<Box
sx={{
width:"50%",
background: "#fdfdfd",
display: "flex",
justifyContent: "center",
alignItems: "center",
p: 2
}}
>

<img
src={loginImage}
alt="asset mannagement"
style={{ width: "100%", height: "100%" }}
/>

</Box>

{/* RIGHT LOGIN FORM */}

<Box
sx={{
flex: 1,
p: 5
}}
>

<Typography
variant="h5"
sx={{ mb: 3 }}
>

Asset Management Login

</Typography>

<TextField
label="Username"
fullWidth
margin="normal"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>

<TextField
label="Password"
type={showPassword ? "text" : "password"}
fullWidth
margin="normal"
value={password}
onChange={(e) => setPassword(e.target.value)}
InputProps={{
endAdornment: (
<InputAdornment position="end">

<IconButton
onClick={() => setShowPassword(!showPassword)}
edge="end"
>

{showPassword ? <VisibilityOff /> : <Visibility />}

</IconButton>

</InputAdornment>
)
}}
/>

<Button
variant="contained"
fullWidth
sx={{
mt: 3,
height: 45,
background: "#5a4fcf"
}}
onClick={handleLogin}
>

SIGN IN

</Button>

</Box>

</Paper>

</Box>

);

};

export default Login;