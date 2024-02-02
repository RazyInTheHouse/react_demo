import { createSlice } from '@reduxjs/toolkit'

const userState = {
    empNo: '',
    empName: '',
    deptID: '',
    branchID: '',
    unitID: '',
    isManager: false,
    isClock: true,
    signLevel: 99,
    accessToken: '',
    isTimeout: true,
    isLogin: false,
    multiUser: [],
    role: [],
    loginType: undefined,
    loginTime: undefined,
    lastAccessTime: undefined,
    listCommonUser: undefined,
    listUnitMember: undefined,
    listQueryUser: undefined,
    listOrganization: [],
    listEmployee: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setData(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        setTimeout(state, action) {
            return {
                ...state,
                isTimeout: true,
            }
        },
        setLastAccessTime(state, action) {
            return {
                ...state,
                lastAccessTime: new Date()
            }
        },
    }
})

export const { setData, setTimeout, setLastAccessTime } = userSlice.actions

export default userSlice.reducer

