import { createSlice } from '@reduxjs/toolkit'

export const themeSwitcherSlice = createSlice({
    name: 'themeSwitcher',
    initialState: {
        darkMode: false,
    },
    reducers: {
        toggleSwitch: state => {
            state.darkMode = !state.darkMode
        },
    },
})

export const { toggleSwitch } = themeSwitcherSlice.actions

export default themeSwitcherSlice.reducer
