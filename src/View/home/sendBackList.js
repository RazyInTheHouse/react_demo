import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { QuerySendBackFormsAction, RevokeAction } from "../../thunk/homeThunk";
import { ToDate } from "../../utility/datetimeFormat";
import { Link } from "react-router-dom";
import SignPopup from "../../module/signPopup";


const List = ({ data }) => {    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const status = useSelector(s => s.parameter.filter(m => m.classID === 'Status')[0])   
    const [isShowPopup, setIsShowPopup] = useState()

    const handleShowPopup = () => {
        setIsShowPopup(true)
    }

    const handleClosePopup = () => {
        setIsShowPopup(false)       
    }

    const handleUpdatePrintApply = () => {
        navigate('/printApplyDetail', { state: { formNo: data.formNo, isEdit: true } })
    }

    const handleRevoke = (formNo, opinion) => {            
        if(opinion === ''){
            alert('請填寫退回原因')
            return
        }
        let input = {
            formNo,
            opinion,
            success:() => {
                alert('撤銷成功')
                dispatch(QuerySendBackFormsAction())
                handleClosePopup()
            }
        }           
        dispatch(RevokeAction(input))
    }

    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="序號">{data.id + 1}</td>
                <td data-title="申請單號"><Link to='/printApplyDetail' state={{ formNo: data.formNo }}>{data.formNo}</Link></td>
                <td data-title="申請日期">{ToDate(data.startTime)}</td>
                <td data-title="退件關卡">{status.data.find(m => m.ID === data.status)?.Name ?? data.status}</td>
                <td data-title="退件原因">{data.opinion}</td>
                <td data-title="">
                    <button className="btn btn-primary" disabled={data.status === 'Mreturned' || data.status === 'Wreturned'? false : true} onClick={handleShowPopup}>撤銷申請單</button>               
                </td>
                <td>
                    <button className="btn btn-primary" disabled={data.status === 'Mreturned' || data.status === 'Wreturned'? false : true} onClick={handleUpdatePrintApply}>調整申請單</button>
                </td>
            </tr>
            {
                <SignPopup formNo={data.formNo} isShow={isShowPopup} onClosePopup={handleClosePopup} onSubmit={handleRevoke}/>                
            }                         
        </React.Fragment>
    )
}

const SendBackList = () => {
    const dispatch = useDispatch() 
    const { listSendBack } = useSelector(s => s.home)
    useEffect(() => {
        dispatch(QuerySendBackFormsAction())
    }, [])

    return(
        <Layout>
            <div className="panel panel-default">
                <Table>
                    <thead>
                        <tr>
                            <th>序號</th>
                            <th>申請單號</th>
                            <th>申請日期</th>
                            <th>退件關卡</th>
                            <th>退件原因</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSendBack.map((para, index)=>
                            <List data={para} key={index} />
                        )}
                    </tbody>
                </Table>
            </div>          
        </Layout>   
    )
}

export default SendBackList