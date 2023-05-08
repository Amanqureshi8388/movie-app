import style from './videosection.module.scss'
import  { useState } from "react";
import Image from "next/image";
import VideoPopup from "../../helper/video/VideoPopup";
import { BsPlayCircle } from "react-icons/bs";



const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className={`${style.skItem} md:w-[25%]`}>
                <div className={`${style.thumb } `}></div>
                <div className={`${style.row }`}></div>
                <div className={`${style.row2 } `}></div>
            </div>
        );
    };

    return (
        <div className={`${style.videosSection} relative mb-[50px] text-white`}>
            <div className="container">
                <div className={`${style.sectionHeading} text-2xl mb-[25px] text-white`}>Official Videos</div>
                {!loading ? (
                    <div className={`${style.videos} md:gap-5 m-0 p-0`}>
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className={`${style.videoItem} md:w-1/4`}
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className={`${style.videoThumbnail} relative mb-4 flex items-center justify-center`}>
                                    <Image
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                        alt="aa"
                                        width={200}
                                        height={200}
                                    />
                                    <BsPlayCircle className=' absolute top-[35%] text-5xl ' />
                                </div>
                                <div className={`${style.videoTitle} text-sm md:text-base`}>{video?.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`${style.videoSkeleton} md:gap-5 md:m-0 md:p-0`}>
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </div>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;