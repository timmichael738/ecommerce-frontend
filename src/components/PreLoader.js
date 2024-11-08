import React from 'react'


const PreLoader = () => {
    return (
        <div className='flex justify-center items-center bg-slate-100 h-[100vh]'>
            <div className='loader'>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
            </div>
        </div>
    )
}

export default PreLoader