import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from '../../module/layout';
import Table from '../../module/table';
import { ApplyPrintApplyAction, PreviewAction} from '../../thunk/homeThunk';
import BackButton from '../../component/backButton';
import { useLocationState } from "../../component/link";
import { add } from 'date-fns';


const Preview = () => {
    const dispatch = useDispatch()
    const applyList = useSelector(s => s.preview)
    const [address, setAddress] = useState('台北市松山區光復北路11巷33號-6')
    const [phone, setPhone] = useState('1661')
    const navigate = useNavigate()
    const formData = useLocationState() 

    const handleSubmit = () => {
        if(!applyList || applyList.length === 0){
            alert('無申請項目')
            return
        }
        let request = {
            empNo: formData.empNo,
            address: address,
            phone: phone,
            details: applyList,
            success:() => {
                alert('起單成功')
                navigate('/')
            }
        }
        dispatch(ApplyPrintApplyAction(request))
    }

    return(
        <Layout>
            <div className="panel panel-default">
                <div className="new-row">
                    <div className="item-4 item-m-12 item-padding">
                        <div className="new-row">
                            <label className="item-form-title form-title">收件地址</label>
                            <div className="item-full form-input">
                                <input type="text" className="btn" value={address} onChange={e => setAddress(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">                    
                <Table>
                    <thead>
                        <tr>
                            <th>品名編號</th>
                            <th>中文名稱</th>
                            <th>單位</th>
                            <th>申請數量</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            applyList.map((m, i)=>
                                <tr key={i} className="first-row last-row">
                                    <td data-title="品名編號">{m.itemID}</td>
                                    <td data-title="中文名稱">{m.itemName}</td>
                                    <td data-title="單位">{m.itemUnit}</td>
                                    <td data-title="申請數量">{m.applyQuantity}</td>
                                </tr>                                          
                            )
                        }        
                    </tbody>
                </Table>                       
            </div>
            <BackButton />
            <button className="btn btn-lg btn-important" onClick={handleSubmit}>送出申請</button>

        </Layout>
    )
}

export default Preview