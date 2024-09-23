import React from 'react'
import './Login.css'
import { NavLink} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const{register,formState,handleSubmit}=useForm();
  const{errors}=formState
  const onsubmitFtn=(data)=>{
console.log(data);
   
  }
  const saveUSerInfo=(data)=>{
    localStorage.setItem("cred",JSON.stringify(data))
  }
  return (
    <div>
       <div className='login-header'>
       Login
        </div>
       
        <form className='login-main-container' onSubmit={handleSubmit(onsubmitFtn)} >
        
            <div className='form-group'>
            <div className='googleOauth'>
            <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                </div>
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
            
            <button className='login-button' onClick={()=>saveUSerInfo}>Login</button>
            <div className='login-text-box'>
            Don't have an account? <NavLink to="/">  SignUp </NavLink>
            <NavLink to="/listapage">List</NavLink>
           
            </div>
        

        </form>
       
    </div>
  )
}