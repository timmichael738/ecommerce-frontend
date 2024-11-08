import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function ChangeUserRole({ name, email, role, onClose, userId, callFn }) {

    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        console.log(e.target.value)
    }

    const updateUserRole = async () => {


        const fetchData = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const response = await fetchData.json()

        if (response.success) {
            toast.success(response.message)
            onClose()
            callFn()
        }

        if (response.error) {
            toast.error(response.message)
        }
    }
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-75'>
            <div className='mx-auto bg-white shadow-md w-full max-w-sm rounded-md'>
                <div className='flex py-1 px-2'>
                    <h1 className='pb-2 text-xl font-medium flex mx-auto'>Change User Role</h1>
                    <button className='ml-auto bg-red-600 hover:bg-red-700 p-3 rounded-full hover:text-white' onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>
                <div className='border-b-2 solid'></div>
                <div className='p-4'>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <div className='flex items-center justify-between my-4'>
                        <p>Role</p>
                        <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                            {
                                Object.values(ROLE).map(element => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white text-sm shadow-md hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
                </div>
            </div>
        </div>
    )
}

export default ChangeUserRole