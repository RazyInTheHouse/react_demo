import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../../module/layout';
import Select from '../../component/select';
import Table from '../../module/table';
import { QueryPrintTypeListAction } from '../../thunk/homeThunk';
import { UpdateTypeAction, InsertTypeAction, UpdateItemAction } from '../../thunk/maintainThunk';
import { useNavigate } from "react-router-dom";
import { act } from 'react-dom/test-utils';



const MaintainView = () => {
    const dispatch = useDispatch()
   
    useEffect(()=>{
        dispatch(QueryPrintTypeListAction())
    },[])

    return (
        <Layout>
            <div className='apply-form-info'>
                <div className='info-content'>
                    <div className='main-content'>                       
                        <MaintainPrintType />
                        <MaintainPrintItem />
                    </div>
                </div>
            </div>                                  
        </Layout>
    )
}

const MaintainPrintType = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const printTypeList = useSelector(s => s.printTypeList)
    const [printType, setPrintType] = useState()
    const [typeName, setTypeName] = useState('')
    const [action, setAction] = useState()

    useEffect(() => {
        if(printType !== undefined){
            setTypeName(printTypeList.find(m => m.type === printType).name)
        }
    },[printType])

    useEffect(() => {        
        setTypeName('')       
    },[action])

    const handleUpdateType = () => {
        if(typeName === ''){
            alert('類別名稱不得為空')
            return
        }
        let input = {
            type: printType,
            name: typeName,
            success: () =>{
                alert('更新成功')
            }
        }
        dispatch(UpdateTypeAction(input))
    }
    const handleInsertType = () => {
        if(typeName === ''){
            alert('請輸入新增類別')
            return
        }
        let input = {
            name: typeName,
            success: () =>{
                alert('新增成功')
            }
        }
        dispatch(InsertTypeAction(input))
    }

    return(
        <div className="panel panel-default">
            <div className="row">
                <h1>印刷品類型異動</h1>
                    <Select value={action} className="item-1 form-control"
                            onChange={(e) => setAction(e.target.value)}
                            showDefault>
                            <option>新增</option>
                            <option>調整</option>
                    </Select> 
                    {
                        action === '調整' &&
                        <Select value={printType} className="item-1 form-control"
                                onChange={(e) => setPrintType(e.target.value)}
                                showDefault>
                            {printTypeList.map((item, index)=>{
                                return <option value={item.type} key={index}>{item.name}</option>
                            })}
                        </Select>    
                    }  
                    {
                        (action === '調整' || action === '新增') &&
                    
                        <input value={typeName} onChange={e => setTypeName(e.target.value)}/>          
                    }
            </div>
            <div className="button-content">
                {
                    action === '新增' ?
                    <button className="btn btn-lg btn-important" onClick={handleInsertType}>確定</button> :
                    <button className="btn btn-lg btn-important" onClick={handleUpdateType}>確定</button>
                }
            </div>
        </div>
    )
}

const MaintainPrintItem = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const printTypeList = useSelector(s => s.printTypeList)
    const [printType, setPrintType] = useState()
    const [printItem, setPrintItem] = useState()
    const createItem = () => {
        let item = {
            index: new Date().getTime,
            itemID:'',
            itemName:'',
            itemUnit:'',
            shelfID:'',
            printType: printType,
        }
        return item
    }

    useEffect(()=>{
        setPrintItem(printTypeList.find(m => m.type === printType)?.items)
    },[printType,printTypeList])

    const handleChangeID = (id, value) => {       
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            itemID: x.index === id ? value : x.itemID
        })))
    }

    const handleChangeName = (id, value) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            itemName: x.itemID === id ? value : x.itemName
        })))
    }

    const handleChangeUnit = (id, value) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            itemUnit: x.itemID === id ? value : x.itemUnit
        })))
    }

    const handleChangeShelf = (id, value) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            shelfID: x.itemID === id ? value : x.shelfID
        })))
    }

    const handleChangeType = (id, value) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            printType: x.itemID === id ? value : x.printType
        })))
    }

    const handleCheckDeleted = (id, value) => {
        setPrintItem(prev => prev.map((x) => ({
            ...x,
            isDelete: x.itemID === id && value
        })))
    }

    const handleAddItem = () => {
        setPrintItem(prev => [...prev, createItem()])
    }

    const handleUpdateItem = () => {
        if(printItem.some(x => x.itemID === '')){
            alert('請輸入品項編號')
            return
        }
        if(printItem.some(x => x.itemName === '')){
            alert('請輸入中文名稱')
            return
        }
        if(printItem.some(x => x.itemUnit === '')){
            alert('請輸入單位')
            return
        }
        if(printItem.some(x => x.shelfID === '')){
            alert('請輸入架號')
            return
        }

        let input = {
            info:{
                type: printType,
                name: printTypeList.find(m => m.type === printType).name,
                items: printItem,
            },
            success:() => {
                alert('更新成功')
                dispatch(QueryPrintTypeListAction())               
                navigate('/maintain')
            }
        }
        dispatch(UpdateItemAction(input))
    }
    return(
        <div className="panel panel-default">
            <div className="row">
                <h1>印刷品項目維護</h1>
                <Select value={printType} className="item-1 form-control"
                        onChange={(e) => setPrintType(e.target.value)}
                        showDefault>
                    {printTypeList.map((item, index)=>{
                        return <option value={item.type} key={index}>{item.name}</option>
                    })}
                </Select>
                {
                    printType != undefined &&
                    <button className="btn btn-secondary" onClick={handleAddItem}>新增品項</button>
                }
            </div>
            <div className="row">
                {   printItem !== undefined &&
                    <Table>
                        <thead>
                            <tr>
                                <th>品名編號</th>
                                <th>中文名稱</th>
                                <th>單位</th>
                                <th>架號</th>
                                <th>類型</th>
                                <th>刪除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                printItem.map((m, i)=>
                                    <tr key={i} className="first-row last-row">
                                        <td data-title="品名編號"><input value={m.itemID} disabled={m.index === undefined} onChange={(e) => { handleChangeID(m.index, e.target.value) }}/></td>
                                        <td data-title="中文名稱"><input value={m.itemName} onChange={(e) => { handleChangeName(m.itemID, e.target.value) }}/></td>
                                        <td data-title="單位"><input value={m.itemUnit} onChange={(e) => { handleChangeUnit(m.itemID, e.target.value) }}/></td>
                                        <td data-title="架號"><input value={m.shelfID} onChange={(e) => { handleChangeShelf(m.itemID, e.target.value) }}/></td>
                                        <td data-title="類型"><input value={m.printType} onChange={(e) => { handleChangeType(m.itemID, e.target.value) }}/></td>
                                        <td data-title="刪除" className="check"><input type="checkbox" onChange={(e) => { handleCheckDeleted(m.itemID, e.target.checked) }}/></td>
                                    </tr>                                          
                                )
                            }        
                        </tbody>
                    </Table>                       
                }
            </div>
            <div className="button-content">
                <button className="btn btn-lg btn-important" onClick={handleUpdateItem}>確定</button>
            </div>
        </div>
    )
}

export default MaintainView