import { configureStore } from "@reduxjs/toolkit";
import algoReducers from "./algoSlice";
import themeReducers from "./themeSlice";
import dashBoardElementReducers from "./dashboardElementSlice"

const store = configureStore({
    reducer:{
        algoSlice: algoReducers,
        themeSlice: themeReducers,
        dashBoardElementSlice: dashBoardElementReducers
    }
})

export default store;