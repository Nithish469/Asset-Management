import api from "./api";

// Get all employees
export const getEmployees = async () => {
  const response = await api.get("/admin/employees");
  return response.data;
};

// Add employee
export const addEmployee = async (data) => {
  const response = await api.post("/admin/employees", data);
  return response.data;
};

// Update employee
export const updateEmployee = async (id, data) => {
  const response = await api.put(`/admin/employees/${id}`, data);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/admin/employees/${id}`);
  return response.data;
};