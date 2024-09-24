import './SignUp.css';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function SignUp() {
    const { register, formState, handleSubmit, watch } = useForm(); 
    const { errors } = formState;

    const onsubmitFtn = (data) => {
        localStorage.setItem('items', JSON.stringify(data));
        window.location.reload();  
        console.log(data);
    };

    const handleGoogleLogin = (response) => {
        const decoded = jwt_decode(response.credential);
        console.log(decoded); // Access user info like decoded.email
        // Optionally store user info or navigate to a different page
    };

    const handleGoogleError = (error) => {
        console.error('Google login failed:', error);
    };

    return (
        <div>
            <div className='signup-header'>Sign Up</div>
            <form className='signup-main-container' onSubmit={handleSubmit(onsubmitFtn)} noValidate>
                <div className='form-group'>
                    <label>Name</label>
                    <input placeholder='Enter Name...' {...register("name", { required: { value: true, message: "Name is required" } })} />
                    {errors.name?.message && <p className='error-message'>{errors.name.message}</p>}
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input placeholder='Enter Email...' type="email" {...register("email", {
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email" },
                        required: { value: true, message: "Email is required" }
                    })} />
                    {errors.email?.message && <p className='error-message'>{errors.email.message}</p>}
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input placeholder='Enter Password...' type="password" {...register("password", {
                        required: { value: true, message: "Password is required" },
                        minLength: { value: 8, message: "Password must be at least 8 characters long" }
                    })} />
                    {errors.password?.message && <p className='error-message'>{errors.password.message}</p>}
                </div>
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input placeholder='Confirm Password...' type='password' {...register("confirmPassword", {
                        required: { value: true, message: "Re-enter the password" },
                        validate: (val) => {
                            if (watch('password') !== val) {
                                return 'Passwords do not match';
                            }
                        }
                    })} />
                    {errors.confirmPassword?.message && <p className='error-message'>{errors.confirmPassword.message}</p>}
                </div>
                <button type="submit" className='signup-button'>Sign Up</button>
                <div className='login-text-box'>
                    Already have an account? <NavLink to="/login">Login here</NavLink>
                </div>
            </form>

            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleGoogleError}
                logoAlignment="left"
            />
        </div>
    );
}

