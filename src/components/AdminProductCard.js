import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayNairaCurrency from '../helper/CurrencyFormat';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DeleteProductAlert from './DeleteProductAlert';

const AdminProductCard = ({
    data,
    fetchData
}) => {

    const [editProduct, setEditProduct] = useState(false);

    const [deleteProduct, setDeleteProduct] = useState(false)

    {/* Delete Product */ }
    const handleDeleteProduct = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.deleteProduct.url, {
            method: SummaryApi.deleteProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify(data)
        })

        const apiData = await response.json()


        if (apiData.success) {
            setDeleteProduct(false)
            fetchData()
            toast.success(apiData.message)
        }

        if (apiData.error) {
            toast.error(apiData.message)
        }
    }

    return (
        <>
            <div className='bg-white p-4 rounded shadow-md relative'>
                <div className='w-40'>
                    <div className='w-32 h-32 flex justify-center items-center'>
                        <img src={data?.productImage[0]} className='object-fill h-full mx-auto' />
                    </div>
                    <h3 title={data?.productName} className='cursor-pointer text-ellipsis line-clamp-1'>{data?.productName}</h3>
                    <div>
                        <p className='line-through'>
                            {
                                displayNairaCurrency(data?.price)
                            }
                        </p>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>
                                {
                                    displayNairaCurrency(data?.sellingPrice)
                                }
                            </p>
                            <p className='text-xs bg-red-600 text-white px-2 py-1 rounded'>
                                {(((data?.sellingPrice - data?.price) / data?.price) * 100).toFixed(2) + '%'}
                            </p>
                        </div>
                        <div className='flex justify-between items-center justify-center mt-10'>
                            <button className='text-xs bg-red-600 text-white px-2 py-1 rounded' onClick={()=> setDeleteProduct(true)}>Delete</button>
                            <div className='w-fit ml-auto bg-green-100 p-2 hover:bg-green-600 rounded-full hover:text-white cursor-pointer mt-2' onClick={() => setEditProduct(true)}>
                                <MdModeEditOutline />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    editProduct && (

                        <AdminEditProduct
                            productData={data}
                            onClose={() => setEditProduct(false)}
                            fecthUpdatedData={fetchData}
                        />
                    )
                }



                {
                    deleteProduct && (
                        <DeleteProductAlert 
                        deleteAction={handleDeleteProduct}
                        displayAction={()=>setDeleteProduct(false)}
                        />
                    )
                }
            </div>
            
        </>
    )
}

export default AdminProductCard