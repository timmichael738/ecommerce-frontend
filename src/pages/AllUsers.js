import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const [allUsers, setAllUsers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: ''
  })


  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }
  useEffect(() => {
    fetchAllUsers()
  }, [])
  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((element, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{element?.name}</td>
                  <td>{element?.email}</td>
                  <td>{element?.role}</td>
                  <td>{moment(element?.createdAt).format('ll')}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={() => {
                        setUpdateUserDetails(element)
                        setOpenModal(true)
                      }}>
                      <MdModeEdit />
                    </button>

                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className={!openModal ? 'hidden' : 'block'}>
        <ChangeUserRole
          onClose={() => setOpenModal(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFn={fetchAllUsers}
        />
      </div>
    </div>
  )
}

export default AllUsers