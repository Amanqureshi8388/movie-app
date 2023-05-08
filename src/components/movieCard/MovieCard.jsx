import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CircleRating from "../helper/CirculRating/CirculRating";
import PosterFallback from "../../assets/images/no-poster.png";
import Link from "next/link";
import style from './moviecard.module.scss'
import Image from "next/image";

const MovieCard = ({ data, fromSearch }) => {
  const url = "https://image.tmdb.org/t/p/w500";
    const posterUrl = data.poster_path
        ? url + data.poster_path
        : PosterFallback;
    return (
        <Link href={`/details/${data.id}`}
            className={`${style.movieCard} mb-7`}
            
        >
            <div className={`${style.posterBlock}`}>
                <Image alt="a" className="posterImg" src={posterUrl} width={200} height={200} priority />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average?.toFixed(1)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock text-white flex flex-col text-ellipsis text-base md:text-xl">
                <span className="title mb-3 ">{data.title || data.name}</span>
                <span className="date  text-sm opacity-[0.5] ">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </Link>
    );
};

export default MovieCard;