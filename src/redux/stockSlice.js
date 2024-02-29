import { createSlice } from '@reduxjs/toolkit'

const initialState = {       
    data:[] 
}

const stockSlice = createSlice({
    name: 'stock',
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
export const { reset, setData } = stockSlice.actions

export default stockSlice.reducer