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
    const {details} = router.query
    const {data,loading} =  useFetch(`/movie/${details && details }/videos`)
    const {data: credits, loading: creditsLoading} =  useFetch(`/movie/${details && details}/credits`)
   
    
  return (
    <>
    <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
    <VideosSection data={data} loading={loading}/>
    <Cast data={credits?.cast} loading={creditsLoading} />
    <Similar id={details} />
    <Recommendation id={details} />
    </>
  )
}

export default Details