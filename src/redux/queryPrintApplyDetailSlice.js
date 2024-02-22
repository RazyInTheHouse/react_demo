import { createSlice } from '@reduxjs/toolkit'

const initialState = {       
    formNo:'',
    status:'',
    applyEmpNo:'',
    applyEmpName:'',
    deptID:'',
    deptName:'',
    unitID:'',
    unitName:'',
    phone:'',
    address:'',
    startTime:'',
    reviewTime:'',
    reviewUser:'', 
    detail:[],         
}

const queryPrintApplyDetailSlice = createSlice({
    name: 'queryPrintApplyDetail',
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
export const { reset, setData } = queryPrintApplyDetailSlice.actions

export default queryPrintApplyDetailSlice.reducer