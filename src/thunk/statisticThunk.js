import { AuthPost, AuthDownLoad } from "../hook/useApi";
import { setShowAlert, setShowLoading } from "../redux/globalSlice";
import { setData } from "../redux/statisticSlice";

export const QueryAction = (payload) => async dispatch => {
    dispatch(setShowLoading(true))
    try{
      let input = {
        reviewTimeBegin: payload.reviewTimeBegin,
        reviewTimeEnd: payload.reviewTimeEnd,
        itemID: payload.itemID,
        unitID: payload.unitID,
        isExport: payload.isExport,
      }
      if(input.isExport){
        await AuthDownLoad('/statistic/query', input)
      } else{
        const data = await AuthPost('/statistic/query', input)
        dispatch(setData({data}))
      }
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
  }