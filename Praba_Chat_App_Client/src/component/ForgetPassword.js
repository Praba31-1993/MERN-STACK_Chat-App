import React from "react";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <div className="w-50 mt-5 m-5 p-5 mx-auto" style={{ background: "white",  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <form
        className="container w-50 m-5 p-5 mx-auto"
        style={{
          background: "white",
          height: "fit-content",
          fontWeight:"bold",
          boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <h2 className="mt-3 font-weight-bold">Forget Password</h2><hr />

        <label for="exampleInputEmail1">Email</label>

        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your Email"
            style={{ height: "60px" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{
            height: "60px",
            borderRadius: "12px",
            background: "#1BF3A6",
            fontSize:'25px',
            fontWeight:'900'
          }}
          onClick={()=>navigate('/createPassword')}
        >
          Forget Password
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
