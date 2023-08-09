import React from "react";
import { useNavigate } from "react-router-dom";

function CreatePassword() {
  const navigate = useNavigate();
  return (
    <div
      className="w-50 mt-5 m-5 p-5 mx-auto"
      style={{
        background: "white",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <form
        className="container w-50 m-5 p-5 mx-auto"
        style={{
          background: "white",
          height: "fit-content",
          fontWeight: "bold",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <h2 className="mt-3 font-weight-bold">Reset Password</h2>
        <hr />

        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>

          <input
            type="password"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your Password"
            style={{ height: "60px" }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Confirm Password</label>

          <input
            type="Password"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your Confirm-Password"
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
            fontSize: "25px",
            fontWeight: "900",
          }}
          onClick={() => navigate("/login")}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default CreatePassword;
