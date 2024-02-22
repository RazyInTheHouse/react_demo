import { createSlice } from '@reduxjs/toolkit'

const initialState = {       
    data:[] 
}

const reviewSlice = createSlice({
    name: 'review',
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
export const { reset, setData } = reviewSlice.actions

export default reviewSlice.reducer