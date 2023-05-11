import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


import DetailsBanner from "../../components/detail/DetailBanner";
import useFetch from '@/components/hooks/useFetch';
import VideosSection from '@/components/detail/videoSection/VideoSection';
import Cast from '@/components/detail/cast/Cast';
import Recommendation from '@/components/detail/carousels/Recommendation';
import Similar from '@/components/detail/carousels/Similar';


const Details = () => {
    const router = useRouter()
    const {Details} = router.query
    const {data,loading} =  useFetch(`/movie/${Details && Details }/videos`)
    const {data: credits, loading: creditsLoading} =  useFetch(`/movie/${Details && Details}/credits`)
   

   
    
  return (
    <>
    <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
    <VideosSection data={data} loading={loading}/>
    <Cast data={credits?.cast} loading={creditsLoading} />
    <Similar id={Details} />
    <Recommendation id={Details} />
    </>
  )
}

export default Details