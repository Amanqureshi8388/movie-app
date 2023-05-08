import React from "react";
import ReactPlayer from "react-player/youtube";

import style from "./videoPopup.module.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`${style.videoPopup} ${show ? `${style.visible}` : ""}`}>
            <div className={style.opacityLayer} onClick={hidePopup}></div>
            <div className={`${style.videoPlayer}`}>
                <span className={`${style.closeBtn}`} onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;