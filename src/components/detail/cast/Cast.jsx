import React from "react";
import Image from "next/image";
import avatar from "../../../assets/images/avatar.png";

const Cast = ({ data, loading }) => {
  const url = "https://image.tmdb.org/t/p/w500";

    
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className={`circle skeleton w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-[50%] mb-3 md:mb-6`}></div>
                <div className={`row skeleton w-full h-5 rounded=[10px] mb-[10px]`}></div>
                <div className={`row2 skeleton w-3/4 h-5 rounded=[10px] m-[0 auto]`}></div>
            </div>
        );
    };
    return (
        <div className="castSection relative mb-[5rem]">
            <div className="container">
                <div className="sectionHeading text-white text-2xl mb-[2.5rem]">Top Cast</div>
                {!loading ? (
                    <div className="listItems flex gap-5 mr-[-20px] ml-[-20px] md:m-0 px-5 overflow-y-hidden">
                        {data && data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem text-center text-white">
                                    <div className="profileImg w-[12.5rem] md:w-[17.5rem] h-[12.5rem] md:h-[17.5rem] mb-4 md:mb-6 rounded-[100px]">
                                        <Image src={imgUrl} alt="a" width={200} height={200} priority className=" w-full h-full object-cover object-[center top] rounded-[100px]" />
                                    </div>
                                    <div className="name text-[1.4rem] md:text-[1.8rem] font-semibold">{item.name}</div>
                                    <div className="character text-[1.4rem] md:text-[1.6rem] leading-5  md:leading-6 opacity-5">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton flex gap-5 mr-[-20px] ml-[-20px] md:m-0 px-5 md:p-0 overflow-hidden">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cast;
