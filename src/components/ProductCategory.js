import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import PreLoader from './PreLoader'

const ProductCategory = () => {

    const [productCategory, setProductCategory] = useState([])
    const [loading, setLoading] = useState(false)

    const [categoryLoading, setCategoryLoading] = useState([])

    const fetchCategoryProduct = async () => {

        setLoading(true)
        const response = await fetch(SummaryApi.productCategory.url)
        const productResponse = await response.json()
        setLoading(false)
        setProductCategory(productResponse.data)
        setCategoryLoading(new Array(productResponse.data.length).fill(null))
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <>
            {loading ? (
                <div className='container mx-auto p-4'>
                <div className='flex flex-wrap justify-center items-center justify-between gap-4'>
                    {
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-r from-slate-200 to-slate-200 via-slate-300 animate-gradient-move' key={"categoryLoading" + index}>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            ) : (
                <div className='container mx-auto p-4'>
                    <div className='flex items-center gap-4 justify-between'>
                        {
                            productCategory.map((product, index) => {

                                return (
                                    <Link to={`/product-category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className='cursor-pointer' key={product?.category + index}>
                                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                            <img src={product.productImage[0]} alt={product.category} className='h-full object-scale-down hover:scale-125 transition duration-200 mix-blend-multiply' />
                                        </div>
                                        <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                    </Link>

                                )
                            })
                        }
                    </div>
                </div>
            )}

        </>
    )
}
export default ProductCategory
