import React, { useEffect, useState } from 'react';
import Layout from '../../module/layout';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import QueryPanel from '../../module/queryPanel';
import Table from '../../module/table';
import { ToDate } from "../../utility/datetimeFormat";
import { DatePicker } from '../../component/datePicker';
import { QueryAction } from '../../thunk/queryThunk';
import { reset } from '../../redux/querySlice';

const List = ({ data }) => {    
    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="序號">{data.id + 1}</td>
                <td data-title="申請單號"><Link to='/queryDetail' state={{ formNo: data.formNo }}>{data.formNo}</Link></td>
                <td data-title="單位代號">{data.unitID}</td>
                <td data-title="單位中文">{data.unitName}</td>
                <td data-title="申請日期">{ToDate(data.startTime)}</td>    
                <td data-title="倉庫審核日期">{ToDate(data.reviewTime)}</td>              
            </tr>           
        </React.Fragment>
    )
}

const QueryView = () => {
    const dispatch = useDispatch()
    const queryData = useSelector(s => s.query)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState()
    const [unitID, setUnitID] = useState('')
    const [orderBy, setOrderBy] = useState('UnitID')

    useEffect(() => {
        dispatch(reset())
    },[])

    const handleQuery = () => {
        let input = {
            startTimeBegin: startDate,
            startTimeEnd: endDate, 
            unitID: unitID,
            orderBy: orderBy,
        }
        dispatch(QueryAction(input))
    }
     return (
        <Layout>
            <h1 className="h1 border-left">申請案件查詢</h1>
            <div className="panel panel-default">
                <QueryPanel onQuery={handleQuery}>
                    <div className="item-1">
                        <label className="item-form-title form-title">＊申請日期起</label>
                        <DatePicker initialValue={startDate}
                            className="form-control"
                            handleCloseCalendar={e => setStartDate(e)}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">申請日期迄</label>
                        <DatePicker initialValue={endDate}
                            className="form-control"
                            handleCloseCalendar={e => setEndDate(e)}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">單位名稱</label>
                        <DatePicker initialValue={endDate}
                            className="form-control"
                            handleCloseCalendar={e => setEndDate(e)}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">排序條件</label>
                        <DatePicker initialValue={endDate}
                            className="form-control"
                            handleCloseCalendar={e => setEndDate(e)}
                        />
                    </div>
                </QueryPanel>
                <div className="dotted-line"></div>
                <Table>
                    <thead>
                        <tr>
                            <th>序號</th>
                            <th>申請單號</th>
                            <th>單位代號</th>
                            <th>單位名稱</th>
                            <th>申請日期</th>
                            <th>倉庫審核日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryData.data.map((para, index)=>
                            <List data={para} key={index} />
                        )}
                    </tbody>
                </Table>
            </div>
        </Layout>
    )
}

export default QueryView