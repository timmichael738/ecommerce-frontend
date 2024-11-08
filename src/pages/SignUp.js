import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import imageToBase64 from "../helper/imageToBase64";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  })

  const navigate = useNavigate();

  const handleOnChange = (e) => {

    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
    if (name === 'password') {
      setPasswordValue(value)
    } else if (name === 'confirmPassword') {
      setConfirmPasswordValue(value)
    } else {
      return (
        null
      )
    }
  }

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageToBase64(file)

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {

        const response = await fetch(SummaryApi.signUp.url, {
          method: SummaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();

        if (responseData.success) {
          toast.success(responseData.message)
          navigate("/login")
        }
        if (responseData.error) {
          toast.error(responseData.message)
        }


      } catch (error) {
        toast.error('There was an error during sign up! Please try again.')
      }
    } else {
      toast.error('Password and confirm password does not match!');
    }
  };

  return (
    <section id='sign-up'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-10 w-full max-w-md mx-auto rounded-md shadow'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img className='rounded-full' src={data.profilePic || loginIcon} alt='login icon' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 bg-opacity-50 text-center pb-4 pt-2 cursor-pointer absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='mt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid py-2'>
              <label className='text-sm py-1'>Name :</label>
              <div className='bg-slate-100 p-2 text-sm rounded-md focus:shadow'>
                <input
                  type='text'
                  placeholder='Enter Your Name'
                  value={data.name}
                  name='name'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid py-2'>
              <label className='text-sm py-1'>Email :</label>
              <div className='bg-slate-100 p-2 rounded-md text-sm focus:shadow'>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={data.email}
                  name='email'
                  required
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid py-2'>
              <label className='text-sm py-1'>Password :</label>
              <div className='bg-slate-100 p-2 flex rounded-md text-sm focus:shadow'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name='password'
                  required
                  onChange={handleOnChange} placeholder='Enter password' className='w-full h-full outline-none bg-transparent' />
                <div className={!passwordValue ? 'hidden cursor-pointer text-sm' : 'block cursor-pointer text-sm'} onClick={handleToggleShowPassword}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className='grid py-2'>
              <label className='text-sm py-1'>Confirm Password :</label>
              <div className='bg-slate-100 p-2 flex rounded-md text-sm focus:shadow'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  name='confirmPassword'
                  required
                  onChange={handleOnChange} placeholder='Confirm Password' className='w-full h-full outline-none bg-transparent' />
                <div className={!confirmPasswordValue ? 'hidden cursor-pointer text-sm' : 'block cursor-pointer text-sm'} onClick={handleToggleShowConfirmPassword}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )
                    }
                  </span>
                </div>
              </div>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Register</button>
          </form>
          <p className='my-4 text-sm'>Already have an account? <Link to={"/login"} className='hover:text-red-700 hover:underline'>Login</Link></p>
        </div>

      </div>
    </section>
  )
}

export default SignUp