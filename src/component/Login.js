import React, { useState } from 'react'
import './Login.css'
import { NavLink,useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

export default function Login() {
  const { register, formState, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { errors } = formState;
  const ERROR_MESSAGES = {
    ACCOUNT_NOT_EXIST: "Account doesn't exist",
    INVALID_USER: "Invalid user",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",};
  const onsubmitFtn = (data) => {
    const item = localStorage.getItem('items');
    if (!item) {
      setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
      return;}
  const parsedItem = JSON.parse(item);
  const { email: signupEmail, password: signupPassword } = parsedItem;
    if (signupEmail === data.email && signupPassword === data.password) {
      const login_data="loged"
      localStorage.setItem('login_items',JSON.stringify(login_data))
      navigate('/listpage');
    } else {
      const login_data=""
      localStorage.setItem('login_items',JSON.stringify(login_data))
      setError(ERROR_MESSAGES.INVALID_USER);}};
  const handleGoogleLogin = (response) => {
    const decodedUser = jwtDecode(response.credential);
    const googleItems = JSON.parse(localStorage.getItem('items')) ;
    const { given_name: googleName, email: googleEmail } = decodedUser;
    if (!googleItems) {
      setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
      return;
    }

    if (googleItems && googleName === googleItems.given_name && googleEmail === googleItems.email) {
      const login_data="loged"
      localStorage.setItem('login_items',JSON.stringify(login_data))
      navigate('/listpage');
    } else {
      localStorage.setItem()
      const login_data=""
      localStorage.setItem('login_items',JSON.stringify(login_data))
      setError(ERROR_MESSAGES.INVALID_USER);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login failed:', error);
    setError(ERROR_MESSAGES.INVALID_USER);
  };
  return (
    <div>
       <div className='login-header'>
       Login
        </div>
        <form className='login-main-container' onSubmit={handleSubmit(onsubmitFtn)} >
            <div className='form-group'>
            <GoogleLogin className="gogle-auth"
                onSuccess={handleGoogleLogin}
                onError={handleGoogleError}       
                text='signup_with'
            />
                {error && <p className='error-messages'>{error}</p>}
                <label>Email</label>
                <input placeholder='Enter Email...' 
                {...register("email",
                  {required:{
                    value:true,
                    message:"email is required"}})}/>
                {errors.email?.message&&<p className='error-message'>{errors.email.message}</p>}
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input placeholder='Enter Password...'
                type="password"
                {...register("password",
                  {required:{
                    value:true,
                    message:"password is required"
                  }})}/>
                {errors.password?.message&&<p className='error-message'>{errors.password.message}</p>}
              </div>
            <button className='login-button' >Login</button>
            <div className='login-text-box'>
            Don't have an account? <NavLink to="/signUp">  SignUp </NavLink>
            </div>
        </form> 
    </div>
  )
}