import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { QueryPendingFormsAction } from "../../thunk/homeThunk";
import { ToDate } from "../../utility/datetimeFormat";
import { Link } from "react-router-dom";

const List = ({ data }) => {    
    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="序號">{data.id + 1}</td>
                <td data-title="申請單號"><Link to='/printApplyDetail' state={{ formNo: data.formNo, isManager: true }}>{data.formNo}</Link></td>
                <td data-title="單位代號">{data.unitID}</td>
                <td data-title="單位中文">{data.unitName}</td>
                <td data-title="申請日期">{ToDate(data.startTime)}</td>              
            </tr>           
        </React.Fragment>
    )
}

const PendingList = () => {
    const dispatch = useDispatch() 
    const { listPending } = useSelector(s => s.home)
    useEffect(() => {
        dispatch(QueryPendingFormsAction())
    }, [])

    return(
        <Layout>
            <div className="panel panel-default">
                <Table>
                    <thead>
                        <tr>
                            <th>序號</th>
                            <th>申請單號</th>
                            <th>單位代號</th>
                            <th>單位中文</th>
                            <th>申請日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPending.map((para, index)=>
                            <List data={para} key={index} />
                        )}
                    </tbody>
                </Table>
            </div>          
        </Layout>   
    )
}

export default PendingList