import React, { useEffect , useState } from "react";
import Carousel from "@/components/helper/carousel/Carousel";
import useFetch from "@/components/hooks/useFetch";

const Popular = () => {
    const {data , loading} =  useFetch('/movie/popular')
   
  return (
    <>
    <section>
       <div className="container">
        <div className={` text-white text-4xl mb-8 `}>Popular Movies</div>
       </div>
       <Carousel data={data?.results} loading={loading} />
    </section>
    </>
  )
}

export default Popular