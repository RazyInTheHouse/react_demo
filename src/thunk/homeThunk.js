import { AuthPost, AuthGet } from "../hook/useApi"
import { setShowAlert, setShowLoading } from "../redux/globalSlice"
import { setData } from "../redux/homeSlice"
import { setData as setDetail, reset } from "../redux/queryPrintApplyDetailSlice"
import { reset as resetPrintType, setPrintType } from '../redux/printTypeListSlice'
import { setPreview, reset as resetPreview } from "../redux/previewSlice"

  export const QueryAppliedFormsAction = (empNo) => async dispatch => {
    dispatch(setShowLoading(true))
    try{
      let input = {
        empNo
      }
      const res = await AuthPost('/home/query', input)
      let nextID = 0
      const data = res.map(m=>({
          ...m,
          id: nextID++
      }))
      dispatch(setData({data}))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
  }

  export const QueryPrintApplyDetailAction = (formNo) => async dispatch => {
      dispatch(setShowLoading(true))
    try{
      
      let input = {
        formNo
      }
      const res = await AuthPost('/home/querydetail', input)
      dispatch(reset())
      dispatch(setDetail(res.data))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
    dispatch(setShowLoading(false))
  }

  export const SaveTempAction = (payload) => async dispatch => {    
    try{
      let input = {
        details : payload
      }
      await AuthPost('/home/savetemp', input)      
      alert('暫存成功')
      
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const RevokeAction = (payload) => async dispatch => {    
    try{
      const { success, ...input } = payload
      await AuthPost('/home/revoke', input)      
      success()     
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const ApplyPrintApplyAction = (payload) => async dispatch => {    
    try{
      const { success, ...input } = payload
      await AuthPost('/home/apply', input)     
      success()
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const UpdatePrintApplyAction = (payload) => async dispatch => {    
    try{
      const { success, ...input } = payload
      await AuthPost('/home/updatePrintApply', input)
      
      success()
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const SignAction = (payload) => async dispatch => {    
    try{
      const { success, ...input } = payload
      await AuthPost('/home/sign', input)
      success()
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const SendBackAction = (payload) => async dispatch => {    
    try{
      const { success, ...input } = payload
      await AuthPost('/home/sendBack', input)
      success()
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const PreviewAction = () => async dispatch => {    
    try{
      let nextSn = 1
      const res = await AuthGet('/home/preview')
      const snData = res.data.data.map(m => ({
        ...m,
        sn : nextSn++
      }))
      dispatch(resetPreview())
      dispatch(setPreview(snData))     
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const QueryPrintTypeListAction = () => async dispatch => {
    try{      
      const res = await AuthGet('/home/queryPrintTypeList')
      dispatch(resetPrintType())
      dispatch(setPrintType(res.data))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  export const QueryPendingFormsAction = () => async dispatch => {
    try{      
      const res = await AuthGet('/home/queryPendingForms')
      let nextID = 0
      const data = res.data.map((m)=>({
        ...m,
        id: nextID++
      }))
      dispatch(setData({ listPending: data }))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }
  export const QuerySendBackFormsAction = () => async dispatch => {
    try{      
      const res = await AuthGet('/home/querySendBackForms')
      let nextID = 0
      const data = res.data.map((m)=>({
        ...m,
        id: nextID++
      }))
      dispatch(setData({ listSendBack: data }))
    }
    catch(error){
      dispatch(setShowAlert(error))
    }
  }

  