import "./App.css";
import { useState } from "react";
import CreatePassword from "./component/CreatePassword";
import ForgetPassword from "./component/ForgetPassword";
import Login from "./component/Login";
import Register from "./component/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../src/component/Sidebar";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Layout from "./component/Layout";
import About from "./pages/About";


function App() {
  const [isAuth, setAuth] = useState(false);

  const handleLogin = () => {
    setAuth(true);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login auth={handleLogin} />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/createPassword" element={<CreatePassword />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/layout" element={<Layout auth={isAuth}/>} />

 
        </Routes>

        {isAuth && (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<About />} />


          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
