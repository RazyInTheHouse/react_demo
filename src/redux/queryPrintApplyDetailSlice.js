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

const queryPrintApplyDetail = createSlice({
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
export const { reset, setData } = queryPrintApplyDetail.actions

export default queryPrintApplyDetail.reducer