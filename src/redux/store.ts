import { configureStore } from '@reduxjs/toolkit'
import themeSwitcherReducer from './features/theme-switch/themeSwitcherSlice'

const store = configureStore({
    reducer: {
        themeSwitcher: themeSwitcherReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
