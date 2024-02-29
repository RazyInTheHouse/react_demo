import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { CompleteAction, SendBackAction, QueryPrintApplyDetailAction } from "../../thunk/reviewThunk";
import { useLocationState } from "../../component/link";
import SignPopup from "../../module/signPopup";
import { useNavigate } from "react-router-dom";



const ReviewDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const printApplyDetail = useSelector(s => s.queryPrintApplyDetail)
    const [detail, setDetail] = useState(printApplyDetail.detail)
    const formData = useLocationState() 
    const [isShowPopup, setIsShowPopup] = useState()


    useEffect(()=>{
        dispatch(QueryPrintApplyDetailAction(formData.formNo))       
    },[])

    useEffect(()=>{
        setDetail(printApplyDetail.detail.map(x => ({
            ...x,
            reason: '無',
        })))
    },[printApplyDetail])

    const handleChange = (e, id) => {        
        setDetail(detail.map(x => ({
            ...x,
            approvedQuantity: x.itemID === id ? e : x.approvedQuantity
        })))
    }
    const handleReasonChange = (e, id) => {
        
        setDetail(detail.map(x => ({
            ...x,
            reason: x.itemID === id ? e : x.reason,
        })))
    }
    const handleDropdownChange = (e, id) => {
        setDetail(detail.map(x => ({
            ...x,
            select: x.itemID === id ? e : x.select,
            reason: x.itemID === id ? e : x.reason
        })))
    }
    const handleShowPopup = () => {
        setIsShowPopup(true)
    }

    const handleClosePopup = () => {
        setIsShowPopup(false)       
    }
    const handleSendBack = (formNo, opinion) => {
        if(!opinion){
            alert('請輸入意見')
            return
        }
        let input = {
            formNo,
            opinion,
            success:() => {
                alert('簽核成功')
                navigate('/review')
            }
        }
        dispatch(SendBackAction(input))
    }
    const handleComplete = () => {
        if(detail.some(x => x.approvedQuantity === '')){
            alert('請填寫核准數量')
            return
        }
        if(detail.some(x => x.reason === '')){
            alert('請填寫原因')
            return
        }
        let input = {
            details : detail,
            success:() => {
                alert('簽核成功')
                navigate('/review')
            }
        }
        dispatch(CompleteAction(input))
    }

    return(
        <Layout>
            <div className="panel panel-default">                          
                <Table>
                    <thead>
                        <tr>
                            <th>品名編號</th>
                            <th>中文名稱</th>
                            <th>單位</th>
                            <th>申請數量</th>
                            <th>庫存數量</th>
                            <th>核准數量</th>
                            <th>原因</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.map((data, index)=>
                            <tr key={index} className="first-row last-row">
                                <td data-title="品名編號">{data.itemID}</td>
                                <td data-title="中文名稱">{data.itemName}</td>
                                <td data-title="單位">{data.itemUnit}</td>
                                <td data-title="申請數量">{data.applyQuantity}</td>
                                <td data-title="庫存數量">{data.warehouseQuantity}</td>
                                <td data-title="核准數量"><input value={data.approvedQuantity} onChange={(e) => handleChange(e.target.value, data.itemID)}/></td>
                                <td data-title="原因">
                                    <select value={data.select} className="item-1"
                                        onChange={(e) => handleDropdownChange(e.target.value, data.itemID)}
                                        >   
                                        <option value={'無'} defaultValue>{'無'}</option>
                                        <option value={'品項缺貨'}>{'品項缺貨'}</option>
                                        <option value={'品項已無提供申請'}>{'品項已無提供申請'}</option>
                                        <option value={'其他'}>{'其他'}</option>                                   
                                    </select>
                                    <input value={data.reason === '其他' ? '' : data.reason} onChange={(e) => handleReasonChange(e.target.value, data.itemID)}/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className="button-content">
                    <button className="btn btn-lg btn-important" onClick={handleShowPopup}>退回申請</button>                    
                    <button className="btn btn-lg btn-important" onClick={handleComplete}>結案</button>
                </div>    
                <SignPopup formNo={formData.formNo} isShow={isShowPopup} onClosePopup={handleClosePopup} onSubmit={handleSendBack}/>

            </div> 
        </Layout>   
    )
}

export default ReviewDetail