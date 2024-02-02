import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        type: '',
        name: '',
        items: [
            {

            },
        ]
    }
]

const printTypeListSlice = createSlice({
    name: 'printTypeList',
    initialState: initialState,
    reducers: {
        reset(state, aciton){
            return [
                
            ]           
        },
        setPrintType(state, action){
            return [
                ...state,
                ...action.payload,
            ]
        } ,    
    }
})

export const { reset, setPrintType } = printTypeListSlice.actions

export default printTypeListSlice.reducer

