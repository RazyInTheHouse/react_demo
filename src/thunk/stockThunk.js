import { AuthPost } from "../hook/useApi";
import { setShowAlert, setShowLoading } from "../redux/globalSlice";
import { setData } from "../redux/stockSlice";

export const SaveAction = (payload) => async dispatch => {
    dispatch(setShowLoading(true))
    try{
      const { success, ...input } = payload
      console.log(input)
      await AuthPost('/stock/updateQuantity', input)
      success()
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
}

export const QueryAction = (payload) => async dispatch => {
  dispatch(setShowLoading(true))
  try{
    const { input } = payload
    const data = await AuthPost('/stock/queryPrintItem', { input })
    dispatch(setData({data}))
    if(typeof payload.success === 'function'){
      payload.success(data)
    }
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
  dispatch(setShowLoading(false))
}