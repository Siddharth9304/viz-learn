import { createSlice } from "@reduxjs/toolkit"

const dashBoardElementSlice = createSlice({
    name: "dashBoardElementSlice",
    initialState: {dashBoardElement: localStorage.getItem("dashBoardElement")},
    reducers: {
        setDashBoardElement : (state, action)=>{
            state.dashBoardElement = action.payload;
            localStorage.setItem("dashBoardElement", state.dashBoardElement);
        }
    }
})

export default dashBoardElementSlice.reducer;
export const { setDashBoardElement } = dashBoardElementSlice.actions;