import React from 'react'

const DeleteProductAlert = ({ deleteAction, displayAction }) => {
    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-40'>
            <div className='bg-white py-10 px-5 rounded shadow'>
                <p className='mb-5 font-semibold'>Are you sure you want to delete the selected product?</p>
                <div className='flex justify-center items-center'>
                    <button className='px-2 py-1 bg-red-600 mr-20 px-5 py-1 rounded text-white outline-none' onClick={deleteAction}>Yes</button>
                    <button className='px-2 py-1 bg-slate-200 px-5 py-1 rounded outline-none' onClick={displayAction}>No</button>
                </div>
            </div>
        </div>
    )

    
}

export default DeleteProductAlert