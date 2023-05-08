import React, { useEffect, useState } from "react";
import MovieCard from "@/components/movieCard/MovieCard";
import { useRouter } from "next/router";
import { useFetch } from "../../components/hooks/useFetch";

import style from "./search.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from "@/components/search/spinner/Spinner";
import { fetchDataFromApi } from "../../components/utils/api";


const Search = () => {
  const url = "https://image.tmdb.org/t/p/w500/";
  const router = useRouter();
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { Search } = router.query;

  
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${Search}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
      );
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${Search}&page=${pageNum}`).then(
        (res) => {
          setData(res);
          setPageNum((prev) => prev + 1);
          setLoading(false);
        }
      );
    };
    useEffect(() => {
      setPageNum(1);
      fetchInitialData();
    }, [Search, fetchInitialData]);
    
  console.log(data);

  return (
    <>
      <section className={`${style.searchResultsPage} pt-[2rem]`}>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <div className="container">
            {data?.results?.length > 0 ? (
              <>
                <div className={`${style.pageTitle}`}>
                  {`Search ${
                    data?.total_results > 1 ? "results" : "result"
                  } of '${Search}'`}
                </div>
                <InfiniteScroll
                  className={`${style.content} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6 mb-[50px]`}
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results.map((item, index) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    );
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <span className={`${style.resultNotFound} text-white`}>
                Sorry, Results not found!
              </span>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Search;
