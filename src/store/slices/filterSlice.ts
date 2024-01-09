import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
  company: ''
}

const dataSlice = createSlice({
  name: 'filter',
  initialState: { Data: initialState },
  reducers: {
    setCompanyData(state, action) {
      state.Data.company = action.payload
    },
  },
})

export const filterData = () => useSelector((state: any) => state.filterInfo.Data)

export const {
  setCompanyData: setFilterAction,
} = dataSlice.actions

export default dataSlice.reducer
