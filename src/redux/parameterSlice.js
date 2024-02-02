import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        classID: 'Status',
        data: [
            {
                ID: 'Manager',
                Name: '主管審核中'
            },
            {
                ID: 'Mreturned',
                Name: '主管退回'
            },
            {
                ID: 'Warehouse',
                Name: '倉庫審核中'
            },
            {
                ID: 'Wreturned',
                Name: '倉庫退回'
            },
            {
                ID: 'Revoke',
                Name: '撤銷'
            },
            {
                ID: 'Complete',
                Name: '表單完成'
            }
        ]
    }
]

const parameterSlice = createSlice({
    name: 'parameter',
    initialState: initialState,
    reducers: {
        setParameter(state, action){
            return [
                ...state,
                {
                    classID: action.payload.ID,
                    data: action.payload.data
                }
            ]
        }       
    }
})

export const { setParameter } = parameterSlice.actions

export default parameterSlice.reducer

