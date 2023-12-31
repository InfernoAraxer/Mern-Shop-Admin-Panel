import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';

// Sets Validity of Login Parameters
let schema = yup.object().shape({
  email: yup.string().email("Email should be valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  // sets functions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Compiles everything and submits values to Slice "onSubmit"
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });
  // Collects States from Page
  const authState = useSelector((state) => state)
  // Sets Cases from the states provided in AuthSlice
  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  // Begins Navigation/Execution 
  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      setTimeout(() => {
        navigate("admin");
      }, 300);
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]); 
  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className='error text-center'>
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text" name="email" label="Email Address" val={formik.values.email} id="email" onChng={formik.handleChange('email')} onBlr={formik.handleBlur('email')}/>
          <div className='error mt-2'>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput type="password" name="password" label="Password" val={formik.values.password} id="pass" onChng={formik.handleChange('password')} onBlr={formik.handleBlur('password')} />
          <div className='error mt-2 mb-2'>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          {/* <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div> */}
          <button className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" style={{ background: "#ffd333"}} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login