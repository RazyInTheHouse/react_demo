import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:
        [{  
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
        }],
    listPending:[],
    listSendBack:[],
}

const homeSlice = createSlice({
    name: 'home',
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
                ...action.payload
            }
        },
    }
})
export const { reset, setData } = homeSlice.actions

export default homeSlice.reducer