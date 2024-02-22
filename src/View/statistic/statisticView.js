import React, { useEffect, useState } from 'react';
import Layout from '../../module/layout';
import { useDispatch, useSelector } from "react-redux";
import QueryPanel from '../../module/queryPanel';
import Table from '../../module/table';
import { DatePicker } from '../../component/datePicker';
import { QueryAction } from '../../thunk/statisticThunk';
import { reset } from '../../redux/statisticSlice';

const List = ({ data }) => {    
    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="單位代號">{data.unitID}</td>
                <td data-title="單位中文">{data.unitName}</td>
                <td data-title="印刷品名">{data.itemName}</td>               
                <td data-title="數量">{data.total}</td>
                <td data-title="申請月份">{data.month}</td>    
            </tr>           
        </React.Fragment>
    )
}

const StatisticView = () => {
    const dispatch = useDispatch()
    const queryData = useSelector(s => s.statistic)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState()
    const [unitID, setUnitID] = useState('11L010')
    const [itemID, setItemID] = useState('')

    useEffect(() => {
        dispatch(reset())
    },[])

    const handleQuery = () => {
        let input = {
            reviewTimeBegin: startDate,
            reviewTimeEnd: endDate, 
            itemID: itemID,
            unitID: unitID,
        }
        dispatch(QueryAction(input))
    }
    
     return (
        <Layout>
            <h1 className="h1 border-left">申請數量統計</h1>
            <div className="panel panel-default">
                <QueryPanel onQuery={handleQuery}>
                    <div className="item-1">
                        <label className="item-form-title form-title">倉庫審核通過日期起</label>
                        <DatePicker initialValue={startDate}
                            className="form-control"
                            handleCloseCalendar={e => setStartDate(e)}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">倉庫審核通過日期迄</label>
                        <DatePicker initialValue={endDate}
                            className="form-control"
                            handleCloseCalendar={e => setEndDate(e)}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">品名名稱</label>
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
                </QueryPanel>
                <div className="dotted-line"></div>
                <Table>
                    <thead>
                        <tr>
                            <th>單位代號</th>
                            <th>單位名稱</th>
                            <th>印刷品名</th>
                            <th>數量</th>
                            <th>申請月份</th>
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

export default StatisticView