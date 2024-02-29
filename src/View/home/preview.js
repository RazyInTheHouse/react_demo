import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from '../../module/layout';
import Table from '../../module/table';
import { ApplyPrintApplyAction, PreviewAction} from '../../thunk/homeThunk';
import BackButton from '../../component/backButton';
import { useLocationState } from "../../component/link";
import AddressSelector from '../../module/addressSelector';
import { QueryUnitAddressAction } from '../../thunk/organizationThunk';
import { setData } from '../../redux/userSlice';



const Preview = () => {
    const dispatch = useDispatch()
    const applyList = useSelector(s => s.preview)
    const { unitID, address } = useSelector(s => s.user)
    const [newUnitID, setNewUnitID] = useState('')
    const [changeAddress, setChangeAddress] = useState(false)
    const navigate = useNavigate()
    const formData = useLocationState() 

    useEffect(() => {
        dispatch(QueryUnitAddressAction({ unitID: unitID }))
    }, [])

    const handleChangeAddress = (unit) => {
        if(unit !== undefined){      
            setNewUnitID(unit.unitID)
            dispatch(setData({address: unit.address}))
        }
    }

    const handleSubmit = () => {
        if(!applyList || applyList.length === 0){
            alert('無申請項目')
            return
        }
        if(address === ''){
            alert('請輸入地址')
            return
        }
        let request = {
            empNo: formData.empNo,
            address: address,
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
            <div className='apply-form-info'>
                <div className='info-content'>
                    <div className='main-content'>
                        <div className="panel panel-default">
                            <div className="row">
                                <div className="item-4 item-m-12 item-padding">
                                    <div className="new-row">
                                        <label className="item-form-title form-title">收件地址</label>
                                        <div className="item-full form-input">
                                            {
                                                changeAddress ? 
                                                <React.Fragment>
                                                    <input type="text" style={{width:"65%"}} value={address} placeholder={'請填入變更之收件地址'} onChange={e => dispatch(setData({address: e.target.value}))}/>
                                                    <AddressSelector 
                                                        className="form-control"
                                                        constraint={[]}
                                                        value={newUnitID}
                                                        onSubmit={handleChangeAddress}
                                                        required={false}
                                                        disabled={false}
                                                    />
                                                    <button className="btn btn-sm btn-info" onClick={e => setChangeAddress(false)}>確定</button>
                                                </React.Fragment>                  
                                                : 
                                                <React.Fragment>
                                                    <input type="text" style={{width:"80%"}} className="btn" value={address} disabled/>
                                                    <button className="btn btn-sm btn-info" onClick={e => setChangeAddress(true)}>變更收件地址</button>
                                                </React.Fragment>                                                
                                            }                                            
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
                        {
                            !changeAddress &&
                            <div className="button-content">
                                <BackButton className={'btn-lg'}/>
                                <button className="btn btn-lg btn-important" onClick={handleSubmit}>送出申請</button>
                            </div>
                        }                   
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Preview