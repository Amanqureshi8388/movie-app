import ApiStore from "./ApiStore";
import { configureStore } from "@reduxjs/toolkit";




export const store = configureStore({
    reducer:{
         MovieApi:ApiStore,
    },
})


