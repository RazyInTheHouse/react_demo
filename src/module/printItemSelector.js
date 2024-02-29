import React, { useEffect, useState } from 'react';
import InputText from '../component/inputText';
import { useSelector, useDispatch } from 'react-redux';
import { QueryAction } from '../thunk/stockThunk';

const PrintItemSelectorPopup = (props) => {
    const dispatch = useDispatch()
    const { value, constraint } = props
    const { onClosePopup, onSubmit } = props
    const { isShow, required } = props
    const queryItem = useSelector(s => s.stock)
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
        dispatch(QueryAction({input}))
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
            dispatch(QueryAction({input}))            
        }
    }, [isShow])
    useEffect(() => {
        if(value){
            dispatch(QueryAction({
                input: value, 
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
                    <h2>{`品項查詢`}</h2>
                    <i className="close fas fa-times" onClick={handleClosePopup}></i>
                </div>
                <div className="popup-body">
                    <div className="popup-content">
                        <div className="tab">
                            <div className="tab-nav">
                                <div className={`tab-nav-item ${activeTab === 'select' ? 'active' : ''}`} onClick={() => setActiveTab('select')}>{`選擇品項`}</div>
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
                                                    <th>品項編號</th>
                                                    <th>品項名稱</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {((queryItem.data ?? []).slice(0, 100)).map((m, i) =>
                                                    <tr key={i}>
                                                        <td>
                                                            <input type="checkbox" checked={m.itemID === currentObject?.itemID}
                                                                onChange={(e) => handleSetObject(e.target.checked, m)}
                                                                />
                                                        </td>
                                                        <td>{m.itemID}</td>
                                                        <td>{m.itemName}</td>
                                                    </tr>
                                                )}
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

const PrintItemSelector = (props) => {
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
                value={object ? `${object.itemName}` : ''}
                onClick={handleShowPopup}
                placeholder={placeholder}
                readOnly={true}
                disabled={disabled}
            />
            <PrintItemSelectorPopup 
                value={value}
                constraint={listConstraint}
                isShow={isShowPopup}
                required={required}
                onSubmit={item => handleSubmit(item)}
                onClosePopup={handleClosePopup}
            />
        </React.Fragment>
    )
}
export default PrintItemSelector