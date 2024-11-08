import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helper/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helper/uploadImage';
import DisplayProductImage from './DisplayProductImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    productData,
    fecthUpdatedData
}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice,
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {

            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadProductImage = async (e) => {
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)

        setData((prev) => {

            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

    }

    const handleDeleteProductImage = async (index) => {

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((prev) => {

            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })

    }

    {/** Upload Product **/ }
    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.updateProducts.url, {
            method: SummaryApi.updateProducts.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        

        if (responseData.success) {
            toast.success(responseData.message)
            console.log('Product:', responseData)
            onClose()
            fecthUpdatedData()
        }

        if (responseData.error) {
            toast.error(responseData.message)
        }
    }

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-40'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>


                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleUpdateProduct}>
                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        
                    />

                    <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='Enter Brand Name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        
                    />

                    <label htmlFor='category' className='mt-3'>Category:</label>
                    <select  value={data.category} className='p-2 bg-slate-100 border rounded' name='category' id='category' onChange={handleOnChange}>
                        <option value={" "} >Select Category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image:</label>

                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'>
                                    <FaCloudUploadAlt />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input  type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProductImage} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2 w-60 h-60 justify-center justify-between'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={100}
                                                        height={100}
                                                        className='bg-slate-100 border cursor-pointer w-fit'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }}
                                                    />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white rounded-full bg-red-600 hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please, Upload Product Image...</p>
                            )
                        }
                    </div>

                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Enter Price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        
                    />

                    <label htmlFor='sellingPrice'>Selling Price:</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter Selling Price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        
                    />

                    <label htmlFor='description'>Description:</label>
                    <textarea
                        className="h-20 bg-slate-100 border resize-none p-1"
                        id="description"
                        value={data.description}
                        name="description"
                        placeholder="Enter Product Description"
                        onChange={handleOnChange}
                        
                    >
                    </textarea>
                    <button className='px-1 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 rounded'>Update Product Details</button>
                </form>
            </div>

            {/* Display Product Image Full Screen */}

            {

                openFullScreenImage && (
                    <DisplayProductImage
                        imgUrl={fullScreenImage}
                        onClose={() => setOpenFullScreenImage(false)}
                    />
                )
            }
        </div>
    )
}

export default AdminEditProduct