import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { QueryPrintApplyDetailAction, UpdatePrintApplyAction, SendBackAction, SignAction } from "../../thunk/homeThunk";
import { useLocationState } from "../../component/link";
import BackButton from '../../component/backButton';
import { useNavigate } from "react-router-dom";
import SignPopup from "../../module/signPopup";



const List = ({ data }) => {
    return(
        <tr className="first-row last-row">
            <td data-title="序號">{data.sn}</td>
            <td data-title="品名編號">{data.itemID}</td>
            <td data-title="中文名稱">{data.itemName}</td>
            <td data-title="單位">{data.itemUnit}</td>
            <td data-title="申請數量">{data.applyQuantity}</td>
        </tr>
    )
}

const PrintApplyDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const printApplyDetail = useSelector(s => s.queryPrintApplyDetail)
    const [detail, setDetail] = useState(printApplyDetail.detail)
    const [address, setAddress] = useState(printApplyDetail.address)
    const formData = useLocationState() 
    const [isShowPopup, setIsShowPopup] = useState()
    const { showLoading } = useSelector(s => s.global)


    useEffect(()=>{
        dispatch(QueryPrintApplyDetailAction(formData.formNo))
    },[])

    useEffect(()=>{
        setDetail(printApplyDetail.detail)
        setAddress(printApplyDetail.address)
    },[printApplyDetail])

    const handleCheckDeleted = (sn, isChecked) => {
        setDetail(detail.map((x) => ({
            ...x,
            isDelete: x.sn === sn ? isChecked : x.isDelete
        })))
    }

    const handleCheckQuantity = (sn, quantity) => {
        setDetail(detail.map((x) => ({
            ...x,
            applyQuantity: x.sn === sn ? parseInt(quantity) || '' : x.applyQuantity
        })))
    }

    const handleShowPopup = () => {
        setIsShowPopup(true)
    }

    const handleClosePopup = () => {
        setIsShowPopup(false)       
    }

    const handleSubmit = () => {
        const newDetail = printApplyDetail.detail
        if(newDetail === detail){
            alert('品項無變更')
            return
        }
        
        let request = {
            formNo: printApplyDetail.formNo,
            status: printApplyDetail.status,
            applyEmpNo: printApplyDetail.applyEmpNo,
            address: address,
            details: detail.map((x) => ({
                sn: x.sn,
                itemID: x.itemID,
                applyQuantity: x.applyQuantity,
                isDelete: x.isDelete,
            })),
            success:() => {
                alert('起單成功')
                navigate('/')
            }
        }
        dispatch(UpdatePrintApplyAction(request))
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
                navigate('/pendingList')
            }
        }
        dispatch(SendBackAction(input))
    }

    const handleSign = () => {
        let input = {
            formNo: printApplyDetail.formNo,
            opinion : "同意申請內容",
            success:() => {
                alert('簽核成功')
                navigate('/pendingList')
            }
        }
        
        dispatch(SignAction(input))
    }

    return(
        <Layout>
            <div className="panel panel-default">
                <div className="new-row">
                    <div className="item-4 item-m-12 item-padding">
                        <div className="new-row">
                            <label className="item-form-title form-title">申請人</label>
                            <div className="item-full form-input">
                                <input type="text" className="btn" value={printApplyDetail.applyEmpName} disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="item-4 item-m-12 item-padding">
                        <div className="new-row">
                            <label className="item-form-title form-title">寄送地址</label>
                            <div className="item-full form-input">
                                <input type="text" className="btn" value={address} onChange={e => setAddress(e.target.value)} disabled={!formData.isEdit}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Table>
                    <thead>
                        <tr>
                            <th>序號</th>
                            <th>品名編號</th>
                            <th>中文名稱</th>
                            <th>單位</th>
                            <th>{formData.isEdit ? `調整數量`:`申請數量`}</th>
                            {formData.isEdit && <th>刪除</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {detail.map((data, index)=>
                            formData.isEdit ?
                            <tr className="first-row last-row" key={index}>
                                <td data-title="序號">{data.sn}</td>
                                <td data-title="品名編號">{data.itemID}</td>
                                <td data-title="中文名稱">{data.itemName}</td>
                                <td data-title="單位">{data.itemUnit}</td>
                                <td data-title="調整數量"><input value={data.applyQuantity} onChange={(e) => { handleCheckQuantity(data.sn, e.target.value) }}/></td>
                                <td data-title="刪除" className="check"><input type="checkbox" onChange={(e) => { handleCheckDeleted(data.sn, e.target.checked) }}/></td>
                            </tr> 
                                :
                            <List key={index} data={data} />
                        )}
                    </tbody>
                </Table>
            </div> 
            {  
                formData.isEdit &&
                <div className="button-content">
                    <BackButton className={`btn-lg btn-important`}/>
                    <button className="btn btn-lg btn-important" onClick={handleSubmit}>確認並送出申請單</button>
                </div>                      
            }
            {  
                formData.isManager &&
                <div className="button-content">
                    <button className="btn btn-lg btn-important" onClick={handleShowPopup}>退回申請單</button>                    
                    <button className="btn btn-lg btn-important" onClick={handleSign}>核准申請單</button>
                </div>                      
            }
            {   formData.isManager &&
                <SignPopup formNo={printApplyDetail.formNo} isShow={isShowPopup} onClosePopup={handleClosePopup} onSubmit={handleSendBack}/>
            }
        </Layout>   
    )
}

export default PrintApplyDetail