import { combineReducers } from 'redux'
import userReducer from './userSlice'
import globalReducer from './globalSlice'

const combinedreducer = combineReducers({
    user: userReducer,
    global: globalReducer,
})

export default (state, action) => {
    if (action.type === 'global/logout') { // check for action type 
        state = undefined;
    }
    return combinedreducer(state, action)
}