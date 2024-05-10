import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"shirts"} heading={"Men Shirts"}/>
      <VerticalCardProduct category={"jackets"} heading={"Men Jackets"}/>
      <VerticalCardProduct category={"tops"} heading={"Trendy Women Tops"}/>
      <VerticalCardProduct category={"suits"} heading={"Trendy Women Suits"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired/Wireless Earphones"}/>
      <VerticalCardProduct category={"sandals"} heading={"Women Sandals"}/>
      <VerticalCardProduct category={"shoes"} heading={"Men Shoes"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home