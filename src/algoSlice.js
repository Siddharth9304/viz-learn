import { createSlice } from "@reduxjs/toolkit"

const algoSlice = createSlice({
    name: "algoSlice",
    initialState: {algoTopic: null},
    reducers: {
        setState: (state, action)=>{state.algoTopic = action.payload}
    }
})

export default algoSlice.reducer;
export const { setState } = algoSlice.actions;