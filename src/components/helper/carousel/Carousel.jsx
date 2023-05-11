import React, { useRef } from "react";
import Image from "next/image";
import style from './carouse.module.scss'
import Router from "next/router";

import {
BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import CircleRating from "../CirculRating/CirculRating";
import PosterFallback from "../../../assets/images/no-poster.png";
import Link from "next/link";
import dayjs from "dayjs";

const Carousel = ({data,loading,title}) => {
    const url = "https://image.tmdb.org/t/p/w500";
    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    const skItem = () => {
        return (
            <div className={`${style.skeletonItem}`}>
                <div className={`${style.posterBlock} ${style.skeleton}`}></div>
                <div className={`${style.textBlock}`}>
                    <div className={`${style.title} ${style.skeleton}`}></div>
                    <div className={`${style.date} ${style.skeleton}`}></div>
                </div>
            </div>
        );
    };
  return (
    <>
    <section className={`${style.carousel} mb-[5rem]`}>
        <div className="container">
        <div className="relative">
            <div className="text-white mb-5 text-2xl">{title}</div>
            <BsFillArrowLeftCircleFill className={`${style.carouselLeftNav} ${style.arrow}`} onClick={() => navigation("left")}/>
            <BsFillArrowRightCircleFill className={`${style.carouselRightNav} ${style.arrow}`} onClick={() => navigation("right")}/>
            {!loading ? (
                    <div className={`${style.carouselItems}`} ref={carouselContainer}>
                        {data?.map((item) => {
                            console.log(item.id)
                            const posterUrl = item.poster_path
                                ? url + item.poster_path
                                : PosterFallback;
                            return (
                                <Link href={`/details/${item.id}`}
                                    key={item.id}
                                    className={`${style.carouselItem}`}
                                >
                                    <div className={`${style.posterBlock}`}>
                                        <Image src={posterUrl} alt="poster" width={100} height={100} className=" m-0" />
                                        <div className=" absolute z-[1] -bottom-5 -left-[1px]">
                                        <CircleRating
                                            rating={item.vote_average.toFixed(
                                                1
                                                )}
                                                />
                                                </div>
                                    </div>
                                    <div className={`${style.textBlock} text-white flex flex-col text-ellipsis text-base md:text-xl`}>
                                        <span className={`${style.title}  mb-3`}>
                                            {item.title || item.name}
                                        </span>
                                        <span className={`${style.date}  text-sm opacity-[0.5]`}>
                                            {item.release_date}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className={`${style.loadingSkeleton}`}>
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                    
                )}
        </div>
        </div>
    </section>
    </>
  )
}

export default Carousel