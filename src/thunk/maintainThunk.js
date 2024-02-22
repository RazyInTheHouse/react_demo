import { AuthPost } from "../hook/useApi";
import { setShowAlert, setShowLoading } from "../redux/globalSlice";

export const UpdateTypeAction = (payload) => async dispatch => {
  dispatch(setShowLoading(true))
  try{
    const { success, ...input } = payload
    await AuthPost('/maintain/updatePrintType', input)
    success()
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
  dispatch(setShowLoading(false))
}

export const InsertTypeAction = (payload) => async dispatch => {
  dispatch(setShowLoading(true))
  try{
    const { success, ...input } = payload
    await AuthPost('/maintain/insertPrintType', input)
    success()
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
  dispatch(setShowLoading(false))
}

export const UpdateItemAction = (payload) => async dispatch => {
    dispatch(setShowLoading(true))
    try{
      const { success, ...input } = payload
      await AuthPost('/maintain/updatePrintItem', input)
      success()
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
  }