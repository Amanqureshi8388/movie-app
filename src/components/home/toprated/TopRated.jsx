import React from 'react'
import useFetch from '@/components/hooks/useFetch'
import Carousel from '@/components/helper/carousel/Carousel'


const TopRated = () => {
    const {data , loading } = useFetch('/movie/top_rated')
    

  return (
    <>
    <section>
        <div className="container">
      <div className={` text-white text-4xl mb-8 `}>Top Rated Movies</div>
        </div>
      <Carousel data={data?.results} loading={loading}/>
    </section>
   
    </>
  )
}

export default TopRated