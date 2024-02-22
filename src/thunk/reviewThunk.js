import { AuthPost } from "../hook/useApi";
import { setShowAlert, setShowLoading } from "../redux/globalSlice";
import { setData } from "../redux/reviewSlice";

export const QueryAction = (payload) => async dispatch => {
    dispatch(setShowLoading(true))
    try{
      let input = {
        startTimeBegin: payload.reviewTimeBegin,
        startTimeEnd: payload.startTimeEnd,
        unitID: payload.unitID,
      }
      const data = await AuthPost('/review/query', input)
      dispatch(setData({data}))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
}

export const CompleteAction = (payload) => async dispatch => {
  dispatch(setShowLoading(true))
  try{
    const { success, ...input } = payload

    await AuthPost('/review/complete', input)
    success()
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
  dispatch(setShowLoading(false))
}

export const SendBackAction = (payload) => async dispatch => {
  dispatch(setShowLoading(true))
  try{
    const { success, ...input } = payload

    await AuthPost('/review/sendBack', input)
    success()
  }
  catch(error){
    dispatch(setShowAlert(error))
  }
  dispatch(setShowLoading(false))
}