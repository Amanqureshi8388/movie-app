import {useRouter} from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style  from './heroBanner.module.scss'
import useFetch from "@/components/hooks/useFetch";


const HeroBanner = () => {
  const [query, setQuery] = useState("");
  const router = useRouter()
  const [bg,setBg] = useState('')
  const url = "https://image.tmdb.org/t/p/w500";
  const {data,loading} = useFetch("/movie/upcoming")

  

  useEffect(()=>{
     const bg = url + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
     setBg(bg)
  },[data])
 

  const keyUp = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      router.push(`search/${query}`);
    }
  };


  return (
    <>
      <section className={`${style.heroBanner}`}>
        {!loading && 
        <div className={`${style.backdrop_img}`} onClick={()=> router.push('/')} > 
          <Image src={`${bg}`} alt="aa" width='2000' height={300} priority className=" w-full h-full object-fill object-center
          "/>
        </div>
        }
        <div className={`${style.opacity_layer}`}></div>
        <div className="container">
          <div className={`${style.heroBannerContent }`}>
            <span className={`${style.title}`}>Welcome</span>
            <span className={`${style.subTitle}`}>
              Million of movies, TV shows and people to discovered. Explore now.
            </span>
            <div className={`${style.searchInput}`}>
              <input
                type="text"
                placeholder="Search movies and TV show...."
                onKeyUp={keyUp}
                onChange={(e) => setQuery(e.target.value)}
                className={`${style.input} text-black`}
              />
            </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
