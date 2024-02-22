import { createSlice } from '@reduxjs/toolkit'

const initialState = {       
    data:[] 
}

const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        reset(state, action) {
            return {
                ...initialState
            }
        },
        setData(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        },
    }
})
export const { reset, setData } = statisticSlice.actions

export default statisticSlice.reducer