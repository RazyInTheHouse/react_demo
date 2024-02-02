import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showLoading: false,
    showAlert: false,
    message: '',
    showSidebar: false,
}

const globalSlice = createSlice({
    name: 'global',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        setShowLoading(state, action) {
            return {
                ...state,
                showLoading: action.payload
            }
        },
        setShowSidebar(state, action) {
            return {
                ...state,
                showSidebar: action.payload
            }
        },
        setShowAlert(state, action) {
            if (action.payload) {
                alert(action.payload)
            }
        },
        logout() { }
    }
})

export const { setData, setShowLoading, setShowAlert, setShowSidebar, logout } = globalSlice.actions

export default globalSlice.reducer

