import { AuthPost } from "../hook/useApi";
import { setShowAlert, setShowLoading } from "../redux/globalSlice";
import { setData } from "../redux/querySlice";

export const QueryAction = (payload) => async dispatch => {
    dispatch(setShowLoading(true))
    try{
      let input = {
        startTimeBegin: payload.startTimeBegin,
        startTImeEnd: payload.startTImeEnd,
        unitID: payload.unitID,
        orderBy: payload.orderBy,
      }
      const res = await AuthPost('/report/query', input)
      let nextID = 0
      const data = res.map(m=>({
          ...m,
          id: nextID++
      }))
      console.log(data)
      dispatch(setData({data}))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
  }