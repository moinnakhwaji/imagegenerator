import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./context/Usecontext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateImage from "./pages/CreateImage";
import Userimage from "./pages/Userimage";
import Singleimage from "./pages/Singleimage";
import Billing from "./pages/Billing";
const App = () => {
  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token')
    return token ? element : <Navigate to="/login" replace />
  }
  const AuthRedirect = ({element})=>{
    const token = localStorage.getItem('token')
    return token ? <Navigate to="/" replace /> : element  } 
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/create" element={<ProtectedRoute element={<CreateImage />} />} />
          <Route path="/userimage" element={<ProtectedRoute element={<Userimage />} />} />
          <Route path="/userimage/:id" element={<ProtectedRoute element={<Singleimage />} />} />
          <Route path="/billing" element={<ProtectedRoute element={<Billing />} />} />



            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<AuthRedirect element={<Login />} />}/>


          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
