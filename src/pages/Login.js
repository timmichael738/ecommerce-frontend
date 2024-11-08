import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common';
import Context from '../context';
import { toast } from 'react-toastify';


function Login() {

  const navigate = useNavigate()

  const { fetchUserDetails } = useContext(Context)
  

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [data, setData] = useState({
    email: '',
    password: ''
  })


  const handleOnChange = (e) => {
    setPasswordValue(e.target.value)
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    })

    const apiData = await response.json()

    if (apiData.success) {
      toast.success(apiData.message)
      navigate("/")
      fetchUserDetails()
    }

    if (apiData.error) {
      toast.error(apiData.message)
    }
  }
  //console.log('data login:', data)
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-10 w-full max-w-md mx-auto rounded-md shadow'>
          <div className='w-20 h-20 mx-auto'>
            <img className='rounded-full' src={loginIcon} alt='login icon' />
          </div>

          <form className='mt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid py-2'>
              <label className='text-sm py-1'>Email :</label>
              <div className='bg-slate-100 p-2 rounded-md focus:shadow'>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={data.email}
                  name='email'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid py-2'>
              <label className='text-sm py-1'>Password :</label>
              <div className='bg-slate-100 p-2 flex rounded-md focus:shadow'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name='password'
                  onChange={handleOnChange} placeholder='Enter password' className='w-full h-full outline-none bg-transparent' />
                <div className={!passwordValue ? 'hidden cursor-pointer text-sm' : 'block cursor-pointer text-sm'} onClick={() => setShowPassword((prev) => !prev)}>
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
              <Link to={"/forgot-password"} className='block w-fit text-sm py-1 ml-auto hover:underline hover:text-red-600'>Forgot Password?</Link>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>
          <p className='my-4 text-sm'>Don't have an account? <Link to={"/sign-up"} className='hover:text-red-700 hover:underline'>Sign Up</Link></p>
        </div>

      </div>
    </section>
  )
}

export default Login