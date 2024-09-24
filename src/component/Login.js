import React, { useState } from 'react'
import './Login.css'
import { NavLink,useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

export default function Login() {
  const{register,formState,handleSubmit}=useForm();
  const [error ,setError]=useState('')
  const navigate=useNavigate();
  const{errors}=formState

  const onsubmitFtn=(data)=>{
    const item=JSON.parse(localStorage.getItem('items'))
    const sighupEmail=item.email;
    const loginEmail=data.email;
    const sighnupPassword=item.password;
    const loginPassword=data.password;
    if(sighupEmail===loginEmail && sighnupPassword===loginPassword){
      navigate('/listpage')
    }else{
      console.log('invalid user');
      setError("invalid user")
    }
  
    console.log(item.email,"item");
   console.log(data.email,"data");
   
  }
  
  const handleGoogleLogin = (response) => {
    const signUpdecoded = jwtDecode(response.credential);
    const google_items=JSON.parse(localStorage.getItem('items'))
    const google_signUp_name=signUpdecoded.given_name;
    const google_signUp_email=signUpdecoded.email;
    const google_login_name=google_items.given_name;
    const google_login_email=google_items.email;
    if(google_signUp_name===google_login_name && google_signUp_email===google_login_email){
      navigate('/listpage')
    }
    else{
      console.log('invalid user');
      setError("invalid user")
    }

    console.log(signUpdecoded,"stored");
    console.log(google_items,"new");};
   
    

const handleGoogleError = (error) => {
    console.error('Google login failed:', error);};
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
                    message:"email is required"

                  }}
                )}/>
                {errors.email?.message&&<p className='error-message'>{errors.email.message}</p>}
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input placeholder='Enter Password...'
                {...register("password",
                  {required:{
                    value:true,
                    message:"password is required"
                  }}
                )}/>
                {errors.password?.message&&<p className='error-message'>{errors.password.message}</p>}
                
            </div>
            
            <button className='login-button' >Login</button>
            <div className='login-text-box'>
            Don't have an account? <NavLink to="/">  SignUp </NavLink>
            
           
            </div>
        

        </form>
       
    </div>
  )
}