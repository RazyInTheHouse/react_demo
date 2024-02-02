import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
        printType: '',
        itemID: '',
        itemName: '',
        itemUnit: '',
        applyQuantity: 0,
        isApply: '', 
}]


const previewSlice = createSlice({
    name: 'preview',
    initialState: initialState,
    reducers: {
        reset(state, aciton){
            return [
                 
            ]
        },
        setPreview(state, action){
            return [
                ...state,
                ...action.payload,
            ]
        },    
    }
})

export const { reset, setPreview } = previewSlice.actions

export default previewSlice.reducer

