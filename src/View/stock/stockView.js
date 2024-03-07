import React, { useEffect, useState } from 'react';
import Layout from '../../module/layout';
import { useDispatch, useSelector } from "react-redux";
import QueryPanel from '../../module/queryPanel';
import Select from '../../component/select';
import Table from '../../module/table';
import { SaveAction, QueryAction } from '../../thunk/stockThunk';
import { QueryPrintTypeListAction } from '../../thunk/homeThunk';

const StockView = () => {
    const dispatch = useDispatch()
    const [showManage, setShowManage] = useState(false)
    const [showQuery, setShowQuery] = useState(false)

    useEffect(()=> {
        dispatch(QueryPrintTypeListAction())
    }, [])
    const handleShowManage = () => {
        setShowManage(true)
        setShowQuery(false)
    }

    const handleShowQuery = () => {
        setShowQuery(true)
        setShowManage(false)
    }

    return(
        <Layout>
            <div className="button-content">
                <button className="btn btn-lg btn-info" onClick={handleShowManage}>庫存管理</button>
                <button className="btn btn-lg btn-info" onClick={handleShowQuery}>庫存查詢</button>
            </div>
            {
                showManage && <StockManage />
            }
            {
                showQuery && <StockQuery />
            }
        </Layout>
    )
}

const StockManage = () => {
    const dispatch = useDispatch()
    const printTypeList = useSelector(s => s.printTypeList)
    const [printType, setPrintType] = useState()
    const [printItem, setPrintItem] = useState()
    const [increaseQuantity, setIncreaseQuantity] = useState()
    const [deleteQuantity, setDeleteQuantity] = useState()

    useEffect(()=>{
        setPrintItem(printTypeList.find(m => m.type === printType)?.items)
    },[printType])

    useEffect(()=>{
        setPrintItem(printTypeList.find(m => m.type === printType)?.items)
    },[printTypeList])

    const handleChangeIncrease = (value, itemID) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            add: x.itemID === itemID ? parseInt(value) : x.add
        })))
    }

    const handleChangeDelete = (value, itemID) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            delete: x.itemID === itemID ? parseInt(value) : x.delete
        })))
    }

    const handleSave = () => {
        
        if(printItem.every(x => ((x.add === undefined || isNaN(x.add)) && (x.delete === undefined || isNaN(x.delete))))){
            alert('請輸入增減數量')            
            return
        }
        //篩掉沒動過&動過但是沒值的input
        let input = {
            info: printItem.filter(x => (x.add !== undefined && !isNaN(x.add)) || (x.delete !== undefined && !isNaN(x.delete))),
            success:() => {
                alert('儲存成功')
                dispatch(QueryPrintTypeListAction())
            }
        }
        dispatch(SaveAction(input))
    }

    return(
        <div className="panel panel-default">
            <div className="row">
                <Select value={printType} className="item-1 form-control"
                        onChange={(e) => setPrintType(e.target.value)}
                        showDefault>
                    {printTypeList.map((item, index)=>{
                        return <option value={item.type} key={index}>{item.name}</option>
                    })}
                </Select>
            </div>                     
            {   printItem !== undefined &&
                <React.Fragment>
                    <Table>
                        <thead>
                            <tr>
                                <th>品名編號</th>
                                <th>中文名稱</th>
                                <th>單位</th>
                                <th>上次入庫數量</th>
                                <th>現有庫存數量</th>
                                <th>新增數量</th>
                                <th>刪除數量</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                printItem.map((m, i)=>
                                    <tr key={i} className="first-row last-row">
                                        <td data-title="品名編號">{m.itemID}</td>
                                        <td data-title="中文名稱">{m.itemName}</td>
                                        <td data-title="單位">{m.itemUnit}</td>
                                        <td data-title="上次入庫數量">{m.restock}</td>
                                        <td data-title="現有庫存數量">{m.quantity}</td>
                                        <td data-title="新增數量"><input className="form-control form-control-3-1" value={increaseQuantity} onChange={e => handleChangeIncrease(e.target.value, m.itemID)}/></td>
                                        <td data-title="刪除數量"><input className="form-control form-control-3-1" value={deleteQuantity} onChange={e => handleChangeDelete(e.target.value, m.itemID)}/></td>
                                    </tr>                                          
                                )
                            }        
                        </tbody>
                    </Table>         
                    <div className="button-content">
                         <button className="btn btn-lg btn-important" onClick={handleSave}>確定儲存</button>
                    </div>      
                </React.Fragment>        
            }
            
        </div>
    )
}

const StockQuery = () => {
    const dispatch = useDispatch()
    const queryItem = useSelector(s => s.stock)
    const [input, setInput] = useState('')

    const handleQuery = () => {
        dispatch(QueryAction({input}))
    }

    return(
        <div className="panel panel-default">
                <QueryPanel onQuery={handleQuery}>
                    <div className="item-1">
                        <label className="item-form-title form-title">品名名稱</label>
                        <input className="form-control form-control-3-1" value={input} onChange={e => setInput(e.target.value)}/>
                    </div>
                </QueryPanel>
                {   queryItem.data.length !== 0 &&
                        <Table>
                            <thead>
                                <tr>
                                    <th>品名編號</th>
                                    <th>中文名稱</th>
                                    <th>單位</th>
                                    <th>現有庫存數量</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    queryItem.data.map((m, i)=>
                                        <tr key={i} className="first-row last-row">
                                            <td data-title="品名編號">{m.itemID}</td>
                                            <td data-title="中文名稱">{m.itemName}</td>
                                            <td data-title="單位">{m.itemUnit}</td>
                                            <td data-title="現有庫存數量">{m.quantity}</td>
                                        </tr>                                          
                                    )
                                }        
                            </tbody>
                        </Table>             
                }
        </div>
    )
}

export default StockView