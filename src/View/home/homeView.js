import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../../module/layout';
import { FormInfoBox, PendingBox, SendBackBox } from '../../module/homebox';
import Select from '../../component/select';
import Table from '../../module/table';
import { QueryPrintTypeListAction, QueryPendingFormsAction, QuerySendBackFormsAction, SaveTempAction, PreviewAction } from '../../thunk/homeThunk';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const dispatch = useDispatch()
    const { empNo, isManager } = useSelector(s => s.user)
    const printTypeList = useSelector(s => s.printTypeList)
    const { listPending, listSendBack } = useSelector(s => s.home)
    const [printType, setPrintType] = useState()
    const [printItem, setPrintItem] = useState()
    const [tempList, setTempList] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(QueryPrintTypeListAction())
        if(isManager){
            dispatch(QueryPendingFormsAction())
        }
        dispatch(QuerySendBackFormsAction())
    },[])

    useEffect(()=>{
        setPrintItem(printTypeList.find(m => m.type === printType)?.items)
    },[printType])

    const handleChange = (e, id) =>{
        //Listening input value change
        let result = [...printItem]
        result = result.map((x)=>({
            ...x,
            applyQuantity: x.itemID === id ? e : x.applyQuantity
        }))
        setPrintItem(result)
        //add to templist
        const temp = result.filter(x => parseInt(x.applyQuantity) !== 0).map(x => 
            ({
                applyEmpNo: empNo,
                printType: printType,
                itemID: x.itemID,
                itemName: x.itemName,
                applyQuantity: x.applyQuantity,
                isApply: false,
            }))
        setTempList(temp)
    }

    const handleSaveTemp = () =>{
        if(tempList.length === 0){
            alert('請輸入申請數量')
            return
        }
        dispatch(SaveTempAction(tempList))
    }

    const handlePreview = () =>{
        dispatch(PreviewAction())        
        navigate('/preview',  { state: { empNo } })
    }

    return (
        <Layout>
            <div className='apply-form-info'>
                <div className='info-content'>
                    <div className='main-content'>
                        <div className="row mobile-hide" style={{ marginBottom: "16px" }}>
                            <FormInfoBox className="item-1" />
                            {
                                isManager &&
                                <PendingBox className="item-1"  listPending={listPending}/>
                            }   
                            <SendBackBox className="item-1" listSendBack={listSendBack}/>
                        </div>
                        <div className="panel panel-default">
                            <div className="row">
                                <h1>印刷品申請</h1>
                                <Select value={printType} className="item-1 form-control"
                                        onChange={(e) => setPrintType(e.target.value)}
                                        showDefault>
                                    {printTypeList.map((item, index)=>{
                                        return <option value={item.type} key={index}>{item.name}</option>
                                    })}
                                </Select>
                            </div>
                        </div>
                        {   printItem !== undefined &&
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
                                            printItem.map((m, i)=>
                                                <tr key={i} className="first-row last-row">
                                                    <td data-title="品名編號">{m.itemID}</td>
                                                    <td data-title="中文名稱">{m.itemName}</td>
                                                    <td data-title="單位">{m.itemUnit}</td>
                                                    <td data-title="申請數量"><input className="item-1 form-control" value={m.applyQuantity===0 ? '': m.applyQuantity} onChange={(e) => handleChange(e.target.value, m.itemID)}/></td>
                                                </tr>                                          
                                            )
                                        }        
                                    </tbody>
                                </Table>      
                                <div className="button-content">
                                    <button className="btn btn-lg btn-important" onClick={handleSaveTemp}>暫存</button>
                                    <button className="btn btn-lg btn-important" onClick={handlePreview}>預覽及送單</button>
                                </div>                 
                            </div>
                        }
                        
                    </div>
                </div>
            </div>                                  
        </Layout>
    )
}

export default HomeView

