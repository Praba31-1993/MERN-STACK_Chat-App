import "./App.css";
import CreatePassword from "./component/CreatePassword";
import ForgetPassword from "./component/ForgetPassword";
import Login from "./component/Login";
import Register from "./component/Register";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />


        <Route path="/createPassword" element={<CreatePassword/>} />

      </Routes>
    </div>
  );
}

export default App;
