import React, { useEffect ,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@/components/helper/carousel/Carousel";
import style from '../../helper/carousel/carouse.module.scss'
import useFetch from "@/components/hooks/useFetch";

const Trending = () => {
    const {data , loading} =  useFetch(`/trending/movie/week`)

    console.log(data)

   
  return (
    <>
    <section>
    <div className="container">
      <div className={`${style.carouselTitle} text-white text-4xl mb-8 `}>Trending Movies</div>
    </div>
       <Carousel data={data?.results} loading={loading}/>
    </section>
    </>
  )
}


export default Trending
    