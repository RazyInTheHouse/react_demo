import React, { useEffect, useState } from 'react';
import Layout from '../../module/layout';
import { useDispatch, useSelector } from "react-redux";
import QueryPanel from '../../module/queryPanel';
import Table from '../../module/table';
import { Link } from 'react-router-dom';
import { DatePicker } from '../../component/datePicker';
import { QueryAction } from '../../thunk/reviewThunk';
import { reset } from '../../redux/reviewSlice';
import { ToDate } from "../../utility/datetimeFormat";
import OrganizationSelector from '../../module/organizationSelector';


const List = ({ data }) => {    
    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="申請人">{data.applyEmpName}</td>
                <td data-title="申請單號"><Link to='/reviewDetail' state={{ formNo: data.formNo }}>{data.formNo}</Link></td>
                <td data-title="單位代號">{data.unitID}</td>               
                <td data-title="單位名稱">{data.unitName}</td>
                <td data-title="申請日期">{ToDate(data.startTime)}</td>    
            </tr>           
        </React.Fragment>
    )
}

const ReviewView = () => {
    const dispatch = useDispatch()
    const queryData = useSelector(s => s.review)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState()
    const [unitID, setUnitID] = useState('')

    useEffect(() => {
        dispatch(reset())
    },[])
    const handleStartDateChange = (e) => {
        setStartDate(e)
        if(e > endDate){
            setEndDate(e)
        }
    }
    const handleEndDateChange = (e) => {
        setEndDate(e)
        if(e < startDate){
            setStartDate(e)
        }
    }

    const handleQuery = () => {
        let input = {
            startTimeBegin: startDate,
            startTimeEnd: endDate, 
            unitID: unitID,
        }
        dispatch(QueryAction(input))
    }
    
     return (
        <Layout>
            <h1 className="h1 border-left">倉庫審核作業</h1>
            <div className="panel panel-default">
                <QueryPanel onQuery={handleQuery}>
                    <div className="item-1">
                        <label className="item-form-title form-title">申請日期起</label>
                        <DatePicker initialValue={startDate}
                            className="form-control"
                            handleCloseCalendar={handleStartDateChange}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">申請日期迄</label>
                        <DatePicker initialValue={endDate}
                            className="form-control"
                            handleCloseCalendar={handleEndDateChange}
                        />
                    </div>                   
                    <div className="item-1">
                        <label className="item-form-title form-title">單位名稱</label>
                        <OrganizationSelector 
                            className="form-control"
                            constraint={[]}
                            value={unitID}
                            onSubmit={unit => setUnitID(unit?.unitID)}
                            required={true}
                            disabled={false}
                        />
                    </div>
                </QueryPanel>
                <div className="dotted-line"></div>
                <Table>
                    <thead>
                        <tr>
                            <th>申請人</th>
                            <th>申請單號</th>
                            <th>單位代號</th>
                            <th>單位名稱</th>
                            <th>申請日期</th>
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

export default ReviewView