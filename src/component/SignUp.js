import './SignUp.css'
import { NavLink} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google';


export default function SignUp() {
    const{register,formState,handleSubmit,watch}=useForm();
    const{errors}=formState;
    const onsubmitFtn=(data)=>{
        console.log(data);
    }
  return (
    <div >
        <div className='signup-header'>
            SignUp
        </div>
       
        <form className='signup-main-container' onSubmit={handleSubmit(onsubmitFtn)} noValidate>
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
                <label>Name</label>
             
                <input  placeholder='Enter Name...'
                {...register("name",
                    {required:{
                        value:true,
                        message:"name is required"},})}/>
                {errors.name?.message&&<p className='error-message'>{errors.name.message}</p>}
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input placeholder='Enter Email...'
                type="email"
                {...register("email",
                    {
                        pattern:{
                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:"invalid email"},
                            
                                required:{
                                    value:true,
                                    message:"email is required"
                                }
                            })}/>    
            </div>
            {errors.email?.message&&<p className='error-message'>{errors.email.message}</p>}
            <div className='form-group'>
                <label>Password</label>
                <input placeholder='Enter Password...'
                type="password"
                {...register("password",
                    {
                        required:{
                            value:true,
                            message:"password is required"},
                            minLength:{
                                value:8,
                                message:"password must be atleast 8 character long"
                            }})}/>
            {errors.password?.message&&<p className='error-message'>{errors.password.message}</p>}                
            </div>
            <div className='form-group'>
                <label>Confirm Password</label>
                <input placeholder='Confirm Password...'
                type='password'
                {...register("confirmPassword",
                    {
                        required:{
                            value:true,
                            message:"Re-enter the password"
                        },
                        validate:(val)=>{
                            if(watch('password')!==val){
                                return 'passwords do not match'
                            }

                        }
                    }
                )}/>
                {errors.confirmPassword?.message&&<p className='error-message'>{errors.confirmPassword.message}</p>}
            </div>
            <button to="./login" className='signup-button' >Sign Up</button>
            <div className='login-text-box'>
            Already have an account  <NavLink to="/login">Login here</NavLink>
           
            </div>
        

        </form>
       
    </div>
  
  )
}
