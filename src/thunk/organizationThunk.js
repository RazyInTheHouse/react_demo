import { AuthPost } from "../hook/useApi";
import { setShowAlert } from "../redux/globalSlice";
import { setData } from "../redux/userSlice";

//組織
export const QueryOrganizationAction = (payload) => async dispatch => {
    try{
      const { unitID, input } = payload
      const res = await AuthPost('/user/QueryOrganization', { unitID, input })
      
      dispatch(setData({listOrganization: res}))
      if(typeof payload.success === 'function'){
        payload.success(res)
      }
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
}
//組織（地址用）
export const QueryOrganizeDataAction = (payload) => async dispatch => {
  try{
    const { unitID, input } = payload
    const res = await AuthPost('/user/QueryOrganizeData', { unitID, input })
    
    dispatch(setData({listOrganizeData: res}))
    if(typeof payload.success === 'function'){
      payload.success(res)
    }
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
}

export const QueryUnitAddressAction = (payload) => async dispatch => {
  try{
    const { unitID } = payload
    const res = await AuthPost('/user/QueryUnitAddress', { unitID })
    dispatch(setData({address: res[0].address}))

  }
  catch(error){
    dispatch(setShowAlert(error))
  }
}

export const QueryDeptOrganizationAction = (payload) => async dispatch => {
  try{
    const { deptID, input } = payload
    const res = await AuthPost('/user/QueryDeptOrganization', { deptID, input })
    
    dispatch(setData({listOrganization: res}))
    if(typeof payload.success === 'function'){
      payload.success(res)
    }
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
}