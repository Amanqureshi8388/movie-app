import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { BsPlayCircle } from "react-icons/bs";

import useFetch from "../hooks/useFetch";
import CircleRating from "../helper/CirculRating/CirculRating";
import PosterFallback from "../../assets/images/no-poster.png";
import { useRouter } from "next/router";
import style from "./detailbanner.module.scss";
import VideoPopup from "../helper/video/VideoPopup";

const DetailBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const url = "https://image.tmdb.org/t/p/w500";
  const router = useRouter();
  const { Details } = router.query;
  const { data, loading } = useFetch(`/movie/${Details && Details}`);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <>
      <section className={`${style.detailsBanner}`}>
        {!loading ? (
          <>
            {!!data && (
              <>
                <div className={`${style.backdrop_img}`}>
                  <Image
                    src={url + data.backdrop_path}
                    alt=""
                    width={1000}
                    height={1000}
                    priority
                  />
                </div>
                <div className={`${style.opacity_layer}`}></div>
                <div className="container">
                  <div
                    className={`${style.content} grid md:grid-cols-2 gap-10 relative`}
                  >
                    <div className={`${style.left} flex items-center justify-center md:block `}>
                      {data.poster_path ? (
                        <Image
                          className={`${style.posterImg} w-[70%] md:max-w-[35rem] xl:max-w-full block rounded-xl `}
                          src={url + data?.poster_path}
                          alt=""
                          width={100}
                          height={100}
                        />
                      ) : (
                        <Image
                          className={`${style.posterImg}`}
                          src={PosterFallback}
                          alt=""
                          width={200}
                          height={200}
                          priority
                        />
                      )}
                    </div>
                    <div className={`${style.right} text-white`}>
                      <div className={`${style.title} text-2xl md:text-4xl`}>
                        {`${data.name || data.title} (${dayjs(
                          data?.release_date
                        ).format("YYYY")})`}
                      </div>

                      <div className={`${style.subtitle} text-base md:text-xl mb-4 italic opacity-[0.5]`}>{data.tagline}</div>
                      <div
                        className={`${style.row} flex items-center gap-[25px] mb-[25px]`}
                      >
                        <CircleRating rating={data?.vote_average?.toFixed(1)} />
                        <div
                          className={`${style.playbtn}`}
                          onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                          }}
                        >
                          {/* <PlayIcon /> */}
                          <BsPlayCircle className=" text-[40px] md:text-[60px]" />

                          <span className={`${style.text}`}>Watch Trailer</span>
                        </div>
                      </div>

                      <div className="overview mb-6">
                        <div className="heading mb-3 text-2xl">Overview</div>
                        <div className="description leading-[2] text-[1.4rem] font-normal">
                          {data.overview}
                        </div>
                      </div>

                      <div className={`${style.info}`}>
                        {data.status && (
                          <div className={`${style.infoItem}`}>
                            <span className={`${style.text} ${style.bold}`}>
                              Status:{" "}
                            </span>
                            <span className={`${style.text}`}>
                              {data.status}
                            </span>
                          </div>
                        )}
   
                        {data.release_date && (
                          <div className={`${style.infoItem}`}>
                            <span className={`${style.text} ${style.bold} `}>
                              Release Date:{" "}
                            </span>
                            <span className={`${style.text}`}>
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className={`${style.infoItem}`}>
                            <span className={`${style.text} ${style.bold}`}>
                              Runtime:{" "}
                            </span>
                            <span className={`${style.text}`}>
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}


                      </div>
                      {director?.length > 0 && (
                        <div className={`${style.info}`}>
                          <div className={`${style.infoItem}`}>
                          <span className={`${style.text} ${style.bold}`}>
                            Director:{" "}
                          </span>
                          <span className={`${style.text}`}>
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                            </div>
                        </div>
                      )}



                      {writer?.length > 0 && (
                        <div className={`${style.info}`}>
                          <div className={`${style.infoItem}`}>

                          <span className={`${style.text} ${style.bold}`}>
                            Writer:{" "}
                          </span>
                          <span className={`${style.text}`}>
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className={`${style.detailsBannerSkeleton} flex relative flex-col md:flex-row gap-6 md:gap-12`}>
            <div className="container">
              <div className={`${style.left} shrink-0 w-full block rounded-xl`}></div>
              <div className={`${style.right} w-full`}>
                <div className={`${style.row} ${style.skeleton}`}></div>
                <div className={`${style.row} ${style.skeleton}`}></div>
                <div className={`${style.row} ${style.skeleton}`}></div>
                <div className={`${style.row} ${style.skeleton}`}></div>
                <div className={`${style.row} ${style.skeleton}`}></div>
                <div className={`${style.row} ${style.skeleton}`}></div>
                <div className={`${style.row} ${style.skeleton}`}></div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default DetailBanner;


