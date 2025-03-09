import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {darkMode: localStorage.getItem("theme")==="dark"},
    reducers: {
        switchTheme : (state)=>{
            state.darkMode = !state.darkMode;
            localStorage.setItem("theme", state.darkMode?"dark":"light");
        }
    }
})

export default themeSlice.reducer;
export const { switchTheme } = themeSlice.actions;