import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/sidebar";
import Navbar from "./Components/navbar";

import Dashboard from "./views/Dashboard";
import Employees from "./views/Employees";
import Assets from "./views/Assets";
import Assignments from "./views/Assignments";
import Login from "./views/Login";

function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/employees"
        element={
          <Layout>
            <Employees />
          </Layout>
        }
      />

      <Route
        path="/assets"
        element={
          <Layout>
            <Assets />
          </Layout>
        }
      />

      <Route
        path="/assignments"
        element={
          <Layout>
            <Assignments />
          </Layout>
        }
      />

    </Routes>
  );
}

export default App;