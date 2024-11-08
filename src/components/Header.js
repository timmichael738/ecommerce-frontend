import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';


function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      navigate("/login")
      dispatch(setUserDetails(null))
    }

    if (data.error) {
      toast.error(data.message)
    }
  }
  const user = useSelector(state => state?.user?.user)
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none' />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative group flex justify-center'>

            {
              user?._id && (
            <div
              className='text-3xl cursor-pointer relative flex justify-center'
              onClick={() => setMenuDisplay(prev => !prev)}
            >
              {
                user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegUserCircle />
                )
              }
            </div>
              )
            }
            {
              user?.role === ROLE.ADMIN && (
                <div className={!menuDisplay ? 'hidden' : 'absolute bg-white bottom-0 top-11 h-fit p-2 rounded-sm shadow-md hidden md:block'} onClick={() => setMenuDisplay(prev => !prev)}>
                  <nav>

                    <Link to={'/admin-panel/products'} className='whitespace-nowrap p-2'>Admin Panel</Link>


                  </nav>
                </div>
              )
            }
          </div>

          <div className='text-2xl relative'>
            <span><FaShoppingCart /> </span>
            <div className='bg-red-600 text-white w-5 p-1 flex items-center justify-center h-5 rounded-full absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              ) : (

                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
              )
            }
          </div>
        </div>

      </div>

    </header>
  )
}

export default Header