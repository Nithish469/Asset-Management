import React, { useEffect, useState } from "react";
import axios from "axios";

import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";

const Dashboard = () => {

const [employees,setEmployees] = useState(0);
const [assets,setAssets] = useState(0);
const [assigned,setAssigned] = useState(0);
const [available,setAvailable] = useState(0);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{

const token = localStorage.getItem("token");

const empRes = await axios.get(
"http://localhost:5000/api/admin/employees",
{headers:{Authorization:`Bearer ${token}`}}
);

const assetRes = await axios.get(
"http://localhost:5000/api/admin/assets",
{headers:{Authorization:`Bearer ${token}`}}
);

const assignRes = await axios.get(
"http://localhost:5000/api/admin/assignments",
{headers:{Authorization:`Bearer ${token}`}}
);

setEmployees(empRes.data.length);
setAssets(assetRes.data.length);
setAssigned(assignRes.data.length);
setAvailable(assetRes.data.length - assignRes.data.length);

};

return(

<Box sx={{ ml:"240px", pt:"90px", p:3 }}>

<Typography variant="h5" mb={3}>
Dashboard
</Typography>

<Grid container spacing={3}>

{/* Employees */}

<Grid item xs={3}>
<Card sx={{
background:"linear-gradient(135deg,#1976d2,#42a5f5)",
color:"#fff",
borderRadius:3
}}>
<CardContent>

<PeopleIcon sx={{fontSize:40}}/>

<Typography>Total Employees</Typography>

<Typography variant="h4">
{employees}
</Typography>

</CardContent>
</Card>
</Grid>

{/* Assets */}

<Grid item xs={3}>
<Card sx={{
background:"linear-gradient(135deg,#7b1fa2,#ba68c8)",
color:"#fff",
borderRadius:3
}}>
<CardContent>

<DevicesIcon sx={{fontSize:40}}/>

<Typography>Total Assets</Typography>

<Typography variant="h4">
{assets}
</Typography>

</CardContent>
</Card>
</Grid>

{/* Assigned */}

<Grid item xs={3}>
<Card sx={{
background:"linear-gradient(135deg,#2e7d32,#66bb6a)",
color:"#fff",
borderRadius:3
}}>
<CardContent>

<AssignmentIcon sx={{fontSize:40}}/>

<Typography>Assigned Assets</Typography>

<Typography variant="h4">
{assigned}
</Typography>

</CardContent>
</Card>
</Grid>

{/* Available */}

<Grid item xs={3}>
<Card sx={{
background:"linear-gradient(135deg,#d32f2f,#ef5350)",
color:"#fff",
borderRadius:3
}}>
<CardContent>

<InventoryIcon sx={{fontSize:40}}/>

<Typography>Available Assets</Typography>

<Typography variant="h4">
{available}
</Typography>

</CardContent>
</Card>
</Grid>

</Grid>

</Box>

);

};

export default Dashboard;