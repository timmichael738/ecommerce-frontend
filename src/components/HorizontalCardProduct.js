import { React, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import displayNairaCurrency from '../helper/CurrencyFormat'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'

const HorizontalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)


    }

    useEffect(() => {
        fetchData()
    }, [category])

    const scrollRight = () => {
        scrollElement.current.scroll({
            left: scrollElement.current.scrollLeft + 300,
            behavior: 'smooth'
        });
    }

    const scrollLeft = () => {
        scrollElement.current.scroll({
            left: scrollElement.current.scrollLeft - 300,
            behavior: 'smooth'
        });
    }



    return (
        <div className='container mx-auto p-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement}>

                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

                { loading ? (
                        loadingList.map((_, index) => {
                            return (
    
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex' key={index}>
    
                                    <div className='bg-slate-200 h-full p-4 min-w-[80px] md:min-w-[105px]'>
    

    
                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 animate-pulse'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-red-600 font-medium text-sm py-0.5 bg-slate-200 w-full animate-pulse'></p>
                                            <p className='text-slate-500 line-through text-sm font-medium py-0.5 bg-slate-200 w-full animate-pulse'></p>
                                        </div>
                                        <button className='text-sm bg-slate-200 text-white px-3 py-0.5 rounded-full w-full animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (

                        data.map((product) => {
                            return (
    
                                <Link to={'product/'+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex' key={product?._id}>
    
                                    <div className='bg-slate-200 h-full p-4 min-w-[80px] md:min-w-[105px]'>
    
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
    
                                    </div>
                                    <div className='p-3 grid'>
                                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium text-sm'>{displayNairaCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through text-sm font-medium'>{displayNairaCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => {addToCart(e, product?._id)}}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default HorizontalCardProduct