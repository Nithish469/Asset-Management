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
DialogActions,
TextField,
TablePagination
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Assets = () => {

const [assets,setAssets] = useState([]);
const [open,setOpen] = useState(false);
const [editId,setEditId] = useState(null);
const [statusFilter,setStatusFilter]=useState("all");
const [search,setSearch] = useState("");
const [page,setPage] = useState(0);
const [rowsPerPage,setRowsPerPage] = useState(5);

const [formData,setFormData] = useState({
asset_name:"",
asset_type:"",
po_number:"",
purchase_date:"",
asset_value:"",
warranty_start:"",
warranty_end:"",
status:"available"
});

useEffect(()=>{
fetchAssets();
},[]);

const fetchAssets = async()=>{

const token = localStorage.getItem("token");

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
setEditId(null);

setFormData({
asset_name:"",
asset_type:"",
po_number:"",
purchase_date:"",
asset_value:"",
warranty_start:"",
warranty_end:"",
status:"available"
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
`http://localhost:5000/api/admin/assets/${editId}`,
formData,
{
headers:{Authorization:`Bearer ${token}`}
}
);

}else{

await axios.post(
"http://localhost:5000/api/admin/assets",
formData,
{
headers:{Authorization:`Bearer ${token}`}
}
);

}

fetchAssets();
handleClose();
};


const handleEdit = (asset)=>{
setEditId(asset.id);
setFormData(asset);
setOpen(true);
};


const handleDelete = async(id)=>{

const token = localStorage.getItem("token");

await axios.delete(
`http://localhost:5000/api/admin/assets/${id}`,
{
headers:{Authorization:`Bearer ${token}`}
}
);

fetchAssets();
};




/* SEARCH + STATUS FILTER */

const filteredAssets = assets.filter((asset)=>{

const matchesSearch =
asset.asset_name?.toLowerCase().includes(search.toLowerCase()) ||
asset.asset_type?.toLowerCase().includes(search.toLowerCase()) ||
asset.asset_id?.toLowerCase().includes(search.toLowerCase()) ||
asset.po_number?.toLowerCase().includes(search.toLowerCase());

const matchesStatus =
statusFilter === "all" || asset.status === statusFilter;

return matchesSearch && matchesStatus;

});


return(

<div style={{marginLeft:"260px",marginTop:"80px",padding:"20px"}}>

<h2>Assets</h2>

<Button
variant="contained"
onClick={handleOpen}
style={{marginBottom:"10px"}}
>
Add Asset
</Button>

<br/><br/>

<TextField
select
label="Filter by Status"
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
style={{marginRight:"20px",width:"200px"}}
SelectProps={{ native: true }}
>

<option value="all">All</option>
<option value="available">Available</option>
<option value="assigned">Assigned</option>

</TextField>


<TextField
label="Search Assets"
variant="outlined"
size="small"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>



<Table>

<TableHead>

<TableRow>

<TableCell>Asset ID</TableCell>
<TableCell>Name</TableCell>
<TableCell>Type</TableCell>
<TableCell>PO Number</TableCell>
<TableCell>Value</TableCell>
<TableCell>Warranty Start</TableCell>
<TableCell>Warranty End</TableCell>
<TableCell>Status</TableCell>
<TableCell>Actions</TableCell>

</TableRow>

</TableHead>


<TableBody>

{filteredAssets
.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
.map(asset=>(

<TableRow key={asset.id}>

<TableCell>{asset.asset_id}</TableCell>
<TableCell>{asset.asset_name}</TableCell>
<TableCell>{asset.asset_type}</TableCell>
<TableCell>{asset.po_number}</TableCell>
<TableCell>{asset.asset_value}</TableCell>
<TableCell>{asset.warranty_start}</TableCell>
<TableCell>{asset.warranty_end}</TableCell>

<TableCell
style={{
color: asset.status === "available" ? "green" : "orange",
fontWeight:"bold"
}}
>
{asset.status}
</TableCell>

<TableCell>

<IconButton
color="primary"
onClick={()=>handleEdit(asset)}
>
<EditIcon/>
</IconButton>

<IconButton
color="error"
onClick={()=>handleDelete(asset.id)}
>
<DeleteIcon/>
</IconButton>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>



<TablePagination
component="div"
count={filteredAssets.length}
page={page}
onPageChange={(event,newPage)=>setPage(newPage)}
rowsPerPage={rowsPerPage}
onRowsPerPageChange={(e)=>{
setRowsPerPage(parseInt(e.target.value,10));
setPage(0);
}}
rowsPerPageOptions={[5,10,20]}
/>



<Dialog open={open} onClose={handleClose}>

<DialogTitle>
{editId ? "Edit Asset" : "Add Asset"}
</DialogTitle>


<DialogContent>

<TextField
label="Asset Name"
name="asset_name"
fullWidth
margin="normal"
value={formData.asset_name}
onChange={handleChange}
/>

<TextField
label="Asset Type"
name="asset_type"
fullWidth
margin="normal"
value={formData.asset_type}
onChange={handleChange}
/>

<TextField
label="PO Number"
name="po_number"
fullWidth
margin="normal"
value={formData.po_number}
onChange={handleChange}
/>

<TextField
type="date"
label="Purchase Date"
name="purchase_date"
fullWidth
margin="normal"
InputLabelProps={{shrink:true}}
value={formData.purchase_date}
onChange={handleChange}
/>

<TextField
label="Asset Value"
name="asset_value"
fullWidth
margin="normal"
value={formData.asset_value}
onChange={handleChange}
/>

<TextField
type="date"
label="Warranty Start Date"
name="warranty_start"
fullWidth
margin="normal"
InputLabelProps={{shrink:true}}
value={formData.warranty_start}
onChange={handleChange}
/>

<TextField
type="date"
label="Warranty End Date"
name="warranty_end"
fullWidth
margin="normal"
InputLabelProps={{shrink:true}}
value={formData.warranty_end}
onChange={handleChange}
/>

<TextField
label="Status"
name="status"
fullWidth
margin="normal"
value={formData.status}
onChange={handleChange}
/>

</DialogContent>


<DialogActions>

<Button onClick={handleClose}>
Cancel
</Button>

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

export default Assets;