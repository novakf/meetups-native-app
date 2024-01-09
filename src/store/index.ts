import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'

const store = configureStore({
  reducer: combineReducers({
    filterInfo: filterReducer,
  })
})

export default store
