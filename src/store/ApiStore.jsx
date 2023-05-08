import  { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const ApiStore = createSlice({
    name : 'api',
    initialState:{
        MoviesData:[],
        SingleMovie:[],
        isLoading:false,
    },
   
    extraReducers:(builder)=>{
       builder
       .addCase(fetchMovieApi.fulfilled,(state,action)=>{
           state.MoviesData = action.payload
           state.isLoading = true
       })
       .addCase(fetchMovieApi.pending,(state,action)=>{
            state.isLoading = false
       })


       .addCase(fetchSingleMovieApi.fulfilled,(state,action)=>{
        state.SingleMovie = action.payload
       })
    }
})

export default ApiStore.reducer



// export const  fetchMovieApi = createAsyncThunk('movie/fetch',async(id)=>{
//     const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=0ba6f059ec62e46ad08618bf53f589f0&language=en-US&query=${id}&page=1&include_adult=false`)
//     const fetchData = await response.json()
//     return fetchData
// }) 
export const  fetchMovieApi = createAsyncThunk('movie/fetch',async(id)=>{
    const {Endpoint , page } = id
    const response = await fetch(`https://api.themoviedb.org/3${Endpoint}?api_key=0ba6f059ec62e46ad08618bf53f589f0&language=en-US&${page}`)
    const fetchData = await response.json()
    return fetchData
}) 

export const  fetchSingleMovieApi = createAsyncThunk('SingleMovie/fetch',async(id)=>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0ba6f059ec62e46ad08618bf53f589f0&language=en-US}`)
    const fetchData = await response.json()
    return fetchData
}) 