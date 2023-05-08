import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmE2ZjA1OWVjNjJlNDZhZDA4NjE4YmY1M2Y1ODlmMCIsInN1YiI6IjY0M2VlY2FhN2Y0ZjIxMDU4YmZjNTYxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTGnvrzh6VoP6OM-LpZnEIIZMPsOfcQ0MuEGgVJT0oE"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};