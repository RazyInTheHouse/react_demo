import { combineReducers } from 'redux'
import userReducer from './userSlice'
import globalReducer from './globalSlice'
import homeReducer from './homeSlice'
import parameterReducer from './parameterSlice'
import queryPrintApplyDetailReducer from './queryPrintApplyDetailSlice'
import printTypeListReducer from './printTypeListSlice'
import previewReducer from './previewSlice'

const combinedreducer = combineReducers({
    user: userReducer,
    global: globalReducer,
    home: homeReducer,
    parameter: parameterReducer,
    queryPrintApplyDetail : queryPrintApplyDetailReducer,
    printTypeList: printTypeListReducer,
    preview: previewReducer,
})

export default (state, action) => {
    if (action.type === 'global/logout') { // check for action type 
        state = undefined;
    }
    return combinedreducer(state, action)
}