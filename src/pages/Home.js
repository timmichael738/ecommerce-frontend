import React from 'react'
import ProductCategory from '../components/ProductCategory'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalProductCard from '../components/VerticalProductCard'

function Home() {
  return (
    <div>
      
      <ProductCategory/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpods"}/>
      <HorizontalCardProduct category={"camera"} heading={"Quality Cameras"}/>
      <VerticalProductCard category={"mobiles"} heading={"Popular Mobile"}/>
      <VerticalProductCard category={"earphones"} heading={"Popular Earphones"}/>
      </div>
  )
}

export default Home