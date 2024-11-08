import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/index'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayNairaCurrency from '../helper/CurrencyFormat';
import ProductSuggestions from './ProductSuggestions';



const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })


  const params = useParams()
  const [loading, setLoading] = useState(false)
  const productImagelistLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })
  const [showZoomContainer, setShowZoomContainer] = useState(false)

  const backgroundZoomImage = useCallback((e) => {

    const { left, top, width, height } = e.target.getBoundingClientRect()


    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const fetchProductDetails = async () => {

    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const apiData = await response.json()

    setData(apiData?.data)
    setActiveImage(apiData?.data?.productImage[0])
  }


  useEffect(() => {
    fetchProductDetails()
  }, [])

  const handleMouseClickProduct = (imageUrl) => {
    setActiveImage(imageUrl)
  }

  return (
    <div className='container mx-auto p-4'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          {
            loading ? (
              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 animate-pulse'>
              </div>
            ) : (
              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative cursor-zoom-in p-2'>
                <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply'
                  onMouseEnter={() => setShowZoomContainer(true)}
                  onMouseMove={backgroundZoomImage}
                  onMouseLeave={() => setShowZoomContainer(false)}
                />

                {/* Product Zoom */}


                {
                  showZoomContainer && (
                    <div
                      className='absolute min-w-[400px] overflow-hidden min-h-[400px] ml-40 bg-slate-200 p-1 -right-[410px] top-0'
                    >
                      <div
                        className='h-full w-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-100'
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`
                        }}
                      />
                    </div>
                  )
                }
              </div>
            )
          }
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImagelistLoading.map((_, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}>

                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map(imageUrl => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer' key={imageUrl} onClick={() => handleMouseClickProduct(imageUrl)} onMouseEnter={() => handleMouseClickProduct(imageUrl)}>
                          <img src={imageUrl} className='w-full h-full object-scale-down mix-blend-multiply' />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* Product Details */}
        {
          loading ? (
            <div className='flex flex-col gap-6 w-full'>
              <p className='py-3 rounded-full w-32 bg-slate-200 animate-pulse'></p>
              <h2 className='bg-slate-200 animate-pulse w-full py-3'></h2>
              <p className='bg-slate-200 animate-pulse w-32 py-3'></p>

              <div className='bg-slate-200 animate-pulse py-3 w-32'>

              </div>

              <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                <p className='bg-slate-200 animate-pulse py-3 min-w-[120px]'></p>
                <p className='bg-slate-200 animate-pulse py-3 min-w-[120px]'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='bg-slate-200 animate-pulse rounded px-6 py-3 min-w-[120px]'></button>
                <button className='rounded px-6 py-3 min-w-[120px] bg-slate-200 animate-pulse'></button>
              </div>

              <div className='w-full'>
                <p className='bg-slate-200 animate-pulse my-1 py-8 w-full'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-red-600 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                <p className='line-through text-red-400'>{displayNairaCurrency(data?.price)}</p>
                <p>{displayNairaCurrency(data?.sellingPrice)}</p>
              </div>
              <div>
                <p className='text-xs bg-red-200 text-red-600 px-2 py-1 rounded w-fit'>
                  {(((data?.sellingPrice - data?.price) / data?.price) * 100).toFixed(2) + '%'} off discount
                </p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-white hover:text-red-600'>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>

      {
        data?.category && (
          <>
            <ProductSuggestions category={data?.category} heading={"Recommended Products"} />
          </>
        )
      }


    </div>
  )
}

export default ProductDetails