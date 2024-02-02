import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { QuerySendBackFormsAction } from "../../thunk/homeThunk";
import { ToDate } from "../../utility/datetimeFormat";
import { Link } from "react-router-dom";

const List = ({ data }) => {    
    const status = useSelector(s => s.parameter.filter(m => m.classID === 'Status')[0])   

    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="序號">{data.id + 1}</td>
                <td data-title="申請單號"><Link to='/printApplyDetail' state={{ formNo: data.formNo }}>{data.formNo}</Link></td>
                <td data-title="申請日期">{ToDate(data.startTime)}</td>
                <td data-title="退件關卡">{status.data.find(m => m.ID === data.status)?.Name ?? data.status}</td>
                <td data-title="退件原因">{data.opinion}</td>              
            </tr>           
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