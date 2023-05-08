import React from "react";

import Carousel from "../../helper/carousel/Carousel";

import useFetch from "../../hooks/useFetch";

const Similar = ({  id }) => {
    const { data, loading, error } = useFetch(`/movie/${id}/similar`);


    return (
        <Carousel
            title={'Similar Movies'}
            data={data?.results}
            loading={loading}
        />
    );
};

export default Similar;