import React, { useEffect, useState } from "react";
import axios from "axios";

import {
Table,
TableBody,
TableCell,
TableHead,
TableRow,
Button,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
TextField,
MenuItem,
IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const Assignments = () => {

const [assignments,setAssignments] = useState([]);
const [employees,setEmployees] = useState([]);
const [assets,setAssets] = useState([]);

const [open,setOpen] = useState(false);

const [formData,setFormData] = useState({
employeeId:"",
assetId:""
});

useEffect(()=>{
fetchAssignments();
fetchEmployees();
fetchAssets();
},[]);


const token = localStorage.getItem("token");


const fetchAssignments = async()=>{

const res = await axios.get(
"http://localhost:5000/api/admin/assignments",
{
headers:{Authorization:`Bearer ${token}`}
}
);

setAssignments(res.data);

};


const fetchEmployees = async()=>{

const res = await axios.get(
"http://localhost:5000/api/admin/employees",
{
headers:{Authorization:`Bearer ${token}`}
}
);

setEmployees(res.data);

};


const fetchAssets = async()=>{

const res = await axios.get(
"http://localhost:5000/api/admin/assets",
{
headers:{Authorization:`Bearer ${token}`}
}
);

setAssets(res.data);

};


const handleOpen = ()=>{
setOpen(true);
};

const handleClose = ()=>{
setOpen(false);
setFormData({
employeeId:"",
assetId:""
});
};


const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};


const handleSubmit = async()=>{

await axios.post(
"http://localhost:5000/api/admin/assignments",
formData,
{
headers:{Authorization:`Bearer ${token}`}
}
);

fetchAssignments();
handleClose();

};


const handleDelete = async(id)=>{

await axios.delete(
`http://localhost:5000/api/admin/assignments/${id}`,
{
headers:{Authorization:`Bearer ${token}`}
}
);

fetchAssignments();

};


return(

<div style={{marginLeft:"260px",marginTop:"80px",padding:"20px"}}>

<h2>Asset Assignments</h2>

<Button
variant="contained"
onClick={handleOpen}
style={{marginBottom:"10px"}}
>
Assign Asset
</Button>

<Table>

<TableHead>
<TableRow>
<TableCell>ID</TableCell>
<TableCell>Employee</TableCell>
<TableCell>Asset</TableCell>
<TableCell>Action</TableCell>
</TableRow>
</TableHead>

<TableBody>

{assignments.map(assign=>(
<TableRow key={assign.id}>

<TableCell>{assign.id}</TableCell>
<TableCell>{assign.name}</TableCell>
<TableCell>{assign.assetName}</TableCell>

<TableCell>

<IconButton
color="error"
onClick={()=>handleDelete(assign.id)}
>
<DeleteIcon/>
</IconButton>

</TableCell>

</TableRow>
))}

</TableBody>

</Table>


<Dialog open={open} onClose={handleClose}>

<DialogTitle>Assign Asset</DialogTitle>

<DialogContent>

<TextField
select
label="Employee"
name="employeeId"
fullWidth
margin="normal"
value={formData.employeeId}
onChange={handleChange}
>

{employees.map(emp=>(
<MenuItem key={emp.id} value={emp.id}>
{emp.name}
</MenuItem>
))}

</TextField>


<TextField
select
label="Asset"
name="assetId"
fullWidth
margin="normal"
value={formData.assetId}
onChange={handleChange}
>

{assets.map(asset=>(
<MenuItem key={asset.id} value={asset.id}>
{asset.asset_name}
</MenuItem>
))}

</TextField>

</DialogContent>

<DialogActions>

<Button onClick={handleClose}>
Cancel
</Button>

<Button
variant="contained"
onClick={handleSubmit}
>
Assign
</Button>

</DialogActions>

</Dialog>

</div>

);

};

export default Assignments;