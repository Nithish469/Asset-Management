import React, { useEffect, useState } from "react";
import axios from "axios";

import {
Table,
TableBody,
TableCell,
TableHead,
TableRow,
Button,
IconButton,
Dialog,
DialogTitle,
DialogContent,
TextField,
DialogActions
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Employees = () => {

const [employees,setEmployees] = useState([]);

const [open,setOpen] = useState(false);

const [formData,setFormData] = useState({
name:"",
email:"",
department:"",
designation:""
});

const [editId,setEditId] = useState(null);


useEffect(()=>{
fetchEmployees();
},[]);


const fetchEmployees = async()=>{

const token = localStorage.getItem("token");

const res = await axios.get(
"http://localhost:5000/api/admin/employees",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setEmployees(res.data);
};


const handleOpen = ()=>{
setOpen(true);
};


const handleClose = ()=>{
setOpen(false);
setEditId(null);
setFormData({
name:"",
email:"",
department:"",
designation:""
});
};


const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};


const handleSubmit = async()=>{

const token = localStorage.getItem("token");

if(editId){

await axios.put(
`http://localhost:5000/api/admin/employees/${editId}`,
formData,
{
headers:{Authorization:`Bearer ${token}`}
}
);

}else{

await axios.post(
"http://localhost:5000/api/admin/employees",
formData,
{
headers:{Authorization:`Bearer ${token}`}
}
);

}

fetchEmployees();
handleClose();

};


const handleEdit = (emp)=>{
setEditId(emp.id);
setFormData(emp);
setOpen(true);
};


const handleDelete = async(id)=>{

const token = localStorage.getItem("token");

await axios.delete(
`http://localhost:5000/api/admin/employees/${id}`,
{
headers:{Authorization:`Bearer ${token}`}
}
);

fetchEmployees();

};


return(

<div style={{marginLeft:"260px",marginTop:"80px",padding:"20px"}}>

<h2>Employees</h2>

<Button
variant="contained"
onClick={handleOpen}
style={{marginBottom:"10px"}}
>
Add Employee
</Button>


<Table>

<TableHead>

<TableRow>
<TableCell>ID</TableCell>
<TableCell>Name</TableCell>
<TableCell>Email</TableCell>
<TableCell>Department</TableCell>
<TableCell>Designation</TableCell>
<TableCell>Actions</TableCell>
</TableRow>

</TableHead>

<TableBody>

{employees.map(emp=>(

<TableRow key={emp.id}>

<TableCell>{emp.id}</TableCell>
<TableCell>{emp.name}</TableCell>
<TableCell>{emp.email}</TableCell>
<TableCell>{emp.department}</TableCell>
<TableCell>{emp.designation}</TableCell>

<TableCell>

<IconButton
color="primary"
onClick={()=>handleEdit(emp)}
>
<EditIcon/>
</IconButton>

<IconButton
color="error"
onClick={()=>handleDelete(emp.id)}
>
<DeleteIcon/>
</IconButton>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>


<Dialog open={open} onClose={handleClose}>

<DialogTitle>
{editId ? "Edit Employee" : "Add Employee"}
</DialogTitle>

<DialogContent>

<TextField
label="Name"
name="name"
fullWidth
margin="normal"
value={formData.name}
onChange={handleChange}
/>

<TextField
label="Email"
name="email"
fullWidth
margin="normal"
value={formData.email}
onChange={handleChange}
/>

<TextField
label="Department"
name="department"
fullWidth
margin="normal"
value={formData.department}
onChange={handleChange}
/>

<TextField
label="Designation"
name="designation"
fullWidth
margin="normal"
value={formData.designation}
onChange={handleChange}
/>

</DialogContent>

<DialogActions>

<Button onClick={handleClose}>Cancel</Button>

<Button
variant="contained"
onClick={handleSubmit}
>
Save
</Button>

</DialogActions>

</Dialog>

</div>

);

};

export default Employees;