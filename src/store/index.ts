import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfigFilter = {
  key: 'filter',
  storage,
}

const persistedFilter = persistReducer(persistConfigFilter, filterReducer)

export const store = configureStore({
  reducer: combineReducers({
    filterInfo: persistedFilter,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
