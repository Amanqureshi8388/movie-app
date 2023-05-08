import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./explore.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/search/spinner/Spinner";
import { fetchDataFromApi } from "../../components/utils/api";
import MovieCard from "@/components/movieCard/MovieCard";



  


const Explore = () => {
    const router = useRouter();
    const { Explore } = router.query;
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [movie,setMovie] = useState('movie')
  

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/movie`).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/movie?page=${pageNum}`
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        setData(null);
        setPageNum(1);
        fetchInitialData();
    }, [movie]);

   

    return (
        <div className="explorePage pt-6">
            <div className="container">
                    <div className="pageTitle text-2xl text-white mb-[2rem] ">
                      Explore Movies
                    </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content grid grid-cols-2  md:grid-cols-4 lg:grid-cols-5  gap-8"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className={`${style.resultNotFound}`}>
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Explore;