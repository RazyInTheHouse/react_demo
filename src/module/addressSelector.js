import React, { useEffect, useState } from 'react';
import InputText from '../component/inputText';
import { useSelector, useDispatch } from 'react-redux';
import { QueryOrganizeDataAction } from '../thunk/organizationThunk';

const AddressSelectorPopup = (props) => {
    const dispatch = useDispatch()
    const { value, constraint } = props
    const { onClosePopup, onSubmit } = props
    const { isShow, required } = props
    const { listOrganizeData } = useSelector(s => s.user)
    const [currentObject, setCurrentObject] = useState(undefined)
    const [tmpObject, setTmpObject] = useState(currentObject)
    const [activeTab, setActiveTab] = useState('select')
    const [input, setInput] = useState('')

    //輸入查詢條件
    const handleChangeInput = (value) => {
        setInput(value)
    }
    //查詢
    const handleQueryInput = () => {
        if(constraint.length === 0 && !input){
            alert('請輸入條件')
            return
        }
        
        dispatch(QueryOrganizeDataAction({ unitID: constraint, input: input }))
        
    }
    //選擇
    const handleSetObject = (isChecked, object) => {
        setCurrentObject(isChecked ? object : undefined)
    }
    //送出
    const handleSubmit = () => {
        if(required && !currentObject){
            alert('必填')
            return
        }
        onSubmit(currentObject)
        setInput('')
        setTmpObject(currentObject)
        onClosePopup(false)
    }
    const handleClosePopup = () => {
        setInput('')
        setCurrentObject(tmpObject)
        onClosePopup(false)
    }
    useEffect(() => {
        if(isShow){
            dispatch(QueryOrganizeDataAction({ unitID: constraint, input: '' }))            
        }
    }, [isShow])
    useEffect(() => {       
        if(value){
            dispatch(QueryOrganizeDataAction({
                unitID: constraint, input: value, 
                success: (data) => {
                    setCurrentObject(data[0])
                    setTmpObject(data[0])
                    onSubmit(data[0])
                }
            }))
        }
    }, [value])

    return(
        <div className={`popup-mask ${isShow ? 'show' : ''}`}>
            <div className="popup">
                <div className="popup-header">
                    <h2>{`單位查詢`}</h2>
                    <i className="close fas fa-times" onClick={handleClosePopup}></i>
                </div>
                <div className="popup-body">
                    <div className="popup-content">
                        <div className="tab">
                            <div className="tab-nav">
                                <div className={`tab-nav-item ${activeTab === 'select' ? 'active' : ''}`} onClick={() => setActiveTab('select')}>{`選擇單位`}</div>
                                <div className={`tab-nav-item ${activeTab === 'selected' ? 'active' : ''}`} onClick={() => setActiveTab('selected')}>{`已設定單位`}</div>
                            </div>
                            <div className="tab-body">
                                {activeTab === 'select' &&
                                    <div className="tab-content">
                                        <div className="selector-search-bar">
                                            <div className="title">輸入查詢關鍵字</div>
                                            <div className="input">
                                                <InputText type="text"
                                                    className="form-control icon-search"
                                                    value={input} onChange={e => handleChangeInput(e.target.value.trim())} />
                                            </div>
                                            <div className="button">
                                                <button className="btn btn-default btn-shadow" onClick={handleQueryInput}>查詢</button>
                                            </div>
                                        </div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>選擇</th>
                                                    <th>部室名稱</th>
                                                    <th>單位名稱</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {((listOrganizeData ?? []).slice(0, 100)).map((m, i) =>
                                                    <tr key={i}>
                                                        <td>
                                                            <input type="checkbox" checked={m.unitID === currentObject?.unitID}
                                                                onChange={(e) => handleSetObject(e.target.checked, m)}
                                                                />
                                                        </td>
                                                        <td>{m.deptName}</td>
                                                        <td>{m.unitName}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                {activeTab === 'selected' &&
                                    <div className="tab-content">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>部室名稱</th>
                                                    <th>單位名稱</th>
                                                    <th>刪除</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentObject && 
                                                    <tr>
                                                        <td>{currentObject.deptName}</td>
                                                        <td>{currentObject.unitName}</td>
                                                        <td><button onClick={() => handleSetObject(false, currentObject)} className="btn btn-default btn-shadow">刪除</button></td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popup-bottom align-center">
                    <button className="btn btn-lg btn-important" onClick={handleSubmit}>送出</button>
                </div>
            </div>
        </div>
    )
}

const AddressSelector = (props) => {
    const { value, constraint, onSubmit, placeholder, className, required, disabled } = props
    const [isShowPopup, setIsShowPopup] = useState(false)
    const [object, setObject] = useState(undefined)
    const listConstraint = Array.isArray(constraint) ? constraint : [constraint]
    const handleClosePopup = () => {
        setIsShowPopup(false)
    }
    const handleShowPopup = () => {
        if(!disabled){
            setIsShowPopup(true)
        }
    }
    const handleSubmit = (newObj) => {
        setObject(newObj)
        onSubmit(newObj)
    }

    return(
        <React.Fragment>
            <input 
                className={`${className} icon-search`}
                value={object ? `${object.unitID}-${object.unitName}` : ''}
                onClick={handleShowPopup}
                placeholder={placeholder}
                readOnly={true}
                disabled={disabled}
            />
            <AddressSelectorPopup 
                value={value}
                constraint={listConstraint}
                isShow={isShowPopup}
                required={required}
                onSubmit={unit => handleSubmit(unit)}
                onClosePopup={handleClosePopup}
            />
        </React.Fragment>
    )
}
export default AddressSelector