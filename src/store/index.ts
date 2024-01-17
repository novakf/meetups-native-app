import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: combineReducers({
    filterInfo: filterReducer,
  }),
})

