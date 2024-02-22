import { createSlice } from '@reduxjs/toolkit'

const initialState = {       
    data:[] 
}

const querySlice = createSlice({
    name: 'query',
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
export const { reset, setData } = querySlice.actions

export default querySlice.reducer