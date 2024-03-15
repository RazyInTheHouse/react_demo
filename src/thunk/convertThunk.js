import { AuthDownLoad } from "../hook/useApi";
import { setShowAlert, setShowLoading } from "../redux/globalSlice";

export const DownloadAction = (payload) => async dispatch => {
    dispatch(setShowLoading(true))
    try{

      let input = {
        selectedDate: payload
      }
      await AuthDownLoad('/convert/download', input)
      
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
}