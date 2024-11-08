import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const Products = () => {

  const [openUploadProducts, setOpenUploadProducts] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    const response = await fetch(SummaryApi.fetchProducts.url)

    const apiData = await response.json()

    setAllProducts(apiData?.data || [])

  }

  useEffect(() => {

    fetchAllProducts()

  }, [])


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>{'All Products' + ' ' + '(' + `${allProducts.length}` + ')'}</h2>
        <button onClick={() => setOpenUploadProducts(true)} className='border-2 py-1 px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full'>Upload Product</button>
      </div>

      {/* All Products */}
      <div className='flex flex-wrap h-[calc(100vh-190px)] items-center justify-center justify-between gap-5 py-4 overflow-y-scroll'>
        {
          allProducts.map((products, index) => {

            return (
              
              <AdminProductCard
                data={products}
                key={index + "all products"}
                fetchData={fetchAllProducts}
              />

             
             
            )
          })
        }

      </div>



      {/* Upload Products Component */}

      {
        openUploadProducts && (
          <UploadProducts onClose={() => setOpenUploadProducts(false)} fetchProductData={fetchAllProducts} />
        )
      }
    </div>
  )
}

export default Products