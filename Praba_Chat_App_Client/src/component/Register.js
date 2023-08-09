import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers } from "../Redux/features/GetUserSlice";
import { useDispatch,UseSelector } from "react-redux";
function Register() {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      conform_password: ''

    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('FirstName is Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('LastName is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      password: Yup.string().required('Password is Required'),
      conform_password: Yup.string().required('Confirm Password is Required'),

    }),
    onSubmit: values => {
      dispatch(getUsers)

      if (values) {
        toast.success('Success Notification !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    },
  });

  const navigate = useNavigate()
  return (
    <div className="d-flex w-50 border border-primary mx-auto mt-5 justify-content-between ">
      <div className="w-50" style={{ background: "#1BF3A6" }}>
        <ToastContainer />

        <form
          className="container border border-primary w-75 mt-5 mb-5 mx-auto"
          style={{ background: "white", borderRadius: "10px", height: "fit-content" }}
          onSubmit={formik.handleSubmit}
        >
          <h3 className="mt-3 text-center">Sign Up</h3>
          <hr />
          <div class="form-group ">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your First Name"
              style={{ height: "60px" }}
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
            ) : null}

          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Last Name"
              style={{ height: "60px" }}
              {...formik.getFieldProps('lastName')}
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName ? (
            <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
          ) : null}


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

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your confirm-password"
              style={{ height: "60px" }}
              {...formik.getFieldProps('conform_password')}
            />
            {formik.touched.conform_password && formik.errors.conform_password ? (
              <div style={{ color: 'red' }}>{formik.errors.conform_password}</div>
            ) : null}

          </div>

          <button type="submit" className="btn btn-primary w-100" style={{
            height: "60px", borderRadius: "12px", background: "#1BF3A6", fontSize: "25px",
            fontWeight: "900",
          }}>
            Register
          </button>
          <p className="mt-3 font-weight-bold">Already have an account? <span style={{ color: "#1BF3A6" }} onClick={() => navigate("/login")}>Login</span></p>
        </form>
      </div>
      <div className="w-50 my-auto">
        <p style={{ color: "#1BF3A6", fontSize: '3em', fontWeight: 'bold' }} className="text-center">Welcome to <br />Chat Application <br />Signup Screen</p>
      </div>
    </div>
  );

}

export default Register;
