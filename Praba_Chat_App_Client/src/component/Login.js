import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      password: Yup.string().required('Password is Required'),

    }),
    onSubmit: values => {
      if (values) {
        toast.success('Success Notification !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    },
  });
  const navigate = useNavigate();
  // Login page

  return (
    <div className="d-flex w-50 border border-primary mx-auto mt-5 justify-content-between ">
      <div className="w-50" style={{ background: "#1BF3A6" }}>
        <ToastContainer />
        <form
          className="container border border-primary w-75 mt-5 mb-5 mx-auto"
          style={{
            background: "white",
            borderRadius: "10px",
            height: "fit-content",
          }}
          onSubmit={formik.handleSubmit}
        >
          <h3 className="mt-3 text-center">Log In</h3>
          <hr />

          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Email"
              style={{ height: "60px" }}
              {...formik.getFieldProps('email')}

            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}

          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              style={{ height: "60px" }}
              {...formik.getFieldProps('password')}

            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}

          </div>

          <p
            className="mt-3 font-weight-bold"
            style={{ color: "#1BF3A6" }}
            onClick={() => navigate("/forgetpassword")}
          >
            Forget Password?{" "}
          </p>

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
          >
            Login
          </button>
          <p className="mt-3 font-weight-bold">
            Don't have an account?{" "}
            <span
              style={{ color: "#1BF3A6" }}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
      <div className="w-50 my-auto">
        <p
          style={{ color: "#1BF3A6", fontSize: "3em", fontWeight: "bold" }}
          className="text-center"
        >
          Welcome to <br />
          Chat Application <br />
          Login Screen
        </p>
      </div>
    </div>
  );
}

export default Login;
