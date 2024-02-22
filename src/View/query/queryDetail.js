import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { QueryPrintApplyDetailAction, UpdatePrintApplyAction, SendBackAction, SignAction } from "../../thunk/homeThunk";
import { useLocationState } from "../../component/link";


const List = ({ data }) => {
    return(
        <tr className="first-row last-row">
            <td data-title="序號">{data.sn}</td>
            <td data-title="品名編號">{data.itemID}</td>
            <td data-title="中文名稱">{data.itemName}</td>
            <td data-title="單位">{data.itemUnit}</td>
            <td data-title="申請數量">{data.applyQuantity}</td>
            <td data-title="架號">{data.shelfID}</td>
            <td data-title="核准數量">{data.approvedQuantity}</td>
            <td data-title="原因">{data.reason}</td>
        </tr>
    )
}

const QueryDetail = () => {
    const dispatch = useDispatch()
    const printApplyDetail = useSelector(s => s.queryPrintApplyDetail)
    const [detail, setDetail] = useState(printApplyDetail.detail)
    const [address, setAddress] = useState(printApplyDetail.address)
    const formData = useLocationState() 


    useEffect(()=>{
        dispatch(QueryPrintApplyDetailAction(formData.formNo))
    },[])

    useEffect(()=>{
        setDetail(printApplyDetail.detail)
        setAddress(printApplyDetail.address)
    },[printApplyDetail])

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
                            <th>申請數量</th>
                            <th>架號</th>
                            <th>核准數量</th>
                            <th>原因</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.map((data, index)=>
                            <List key={index} data={data} />
                        )}
                    </tbody>
                </Table>
            </div> 
        </Layout>   
    )
}

export default QueryDetail