import React from "react";

import Carousel from "../../helper/carousel/Carousel";
import useFetch from "../../hooks/useFetch";

const Recommendation = ({ id }) => {
    const { data, loading, error } = useFetch(
        `/movie/${id && id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
        />
    );
};

export default Recommendation;