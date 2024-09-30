import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ReactComponent as Loader } from '../loader/Loader.svg';

export default function Login() {
  const [showLoader, setShowLoader] = useState(false);
  const { register, formState, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { errors } = formState;
  const LOGIN_STATUS_KEY = 'LoginStatus';

  const ERROR_MESSAGES = {
    ACCOUNT_NOT_EXIST: "Account doesn't exist",
    INVALID_USER: "Invalid user",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
  };

  const onSubmit = (data) => {
    setShowLoader(true);
    const loginEmail = data.email;
    const item = localStorage.getItem(loginEmail); // Call once and store in variable

    setTimeout(() => {
      if (!item) {
        setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
        setShowLoader(false);
        return;
      }

      const parsedItem = JSON.parse(item);
      const { email: signupEmail, password: signupPassword } = parsedItem;

      if (signupEmail === data.email && signupPassword === data.password) {
        localStorage.setItem(LOGIN_STATUS_KEY, JSON.stringify("logged"));
        navigate('/listpage', { state: data });
      } else {
        setError(ERROR_MESSAGES.INVALID_USER);
      }
      setShowLoader(false);
    }, 1000);
  };

  const handleGoogleLogin = (response) => {
    const decodedUser = jwtDecode(response.credential);
    const googleEmail = decodedUser.email;
    const googleItem = localStorage.getItem(googleEmail); // Call once and store in variable

    if (!googleItem) {
      setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
      return;
    }

    const googleItems = JSON.parse(googleItem); // Parse once after getting the item
    if (googleItems.email === googleEmail) {
      localStorage.setItem(LOGIN_STATUS_KEY, JSON.stringify("logged"));
      navigate('/listpage', { state: googleItems });
    } else {
      setError(ERROR_MESSAGES.INVALID_USER);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login failed:', error);
    setError(ERROR_MESSAGES.INVALID_USER);
  };

  return (
    <div>
      <div className='login-header'>Login</div>
      <form className='login-main-container' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <div className='google-auth'>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleError}
              text='signin_with'
              shape='pill'
              logo_alignment='left'
            />
          </div>
          {error && <p className='error-messages'>{error}</p>}
          <label>Email</label>
          <input
            placeholder='Enter Email...'
            {...register("email", { required: { value: true, message: ERROR_MESSAGES.EMAIL_REQUIRED } })}
          />
          {errors.email?.message && <p className='error-message'>{errors.email.message}</p>}
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            placeholder='Enter Password...'
            type="password"
            {...register("password", { required: { value: true, message: ERROR_MESSAGES.PASSWORD_REQUIRED } })}
          />
          {errors.password?.message && <p className='error-message'>{errors.password.message}</p>}
        </div>
        <button className='login-button' disabled={showLoader}>
          {!showLoader ? "Login" : <Loader className="spinner" />}
        </button>
        <div className='login-text-box'>
          Don't have an account? <NavLink to="/signUp">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
}
