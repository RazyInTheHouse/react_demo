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
import OrganizationSelector from '../../module/organizationSelector';
import Select from '../../component/select';
import ReactPaginate from 'react-paginate';


const List = ({ data }) => {    
    return(
        <React.Fragment>
            <tr className="first-row last-row">
                <td data-title="序號">{data.id + 1}</td>
                <td data-title="申請單號"><Link to='/queryDetail' state={{ formNo: data.formNo }}>{data.formNo}</Link></td>
                <td data-title="單位代號">{data.unitID}</td>
                <td data-title="單位中文">{data.unitName}</td>
                <td data-title="申請日期">{ToDate(data.startTime)}</td>    
                <td data-title="倉庫審核日期">{data.reviewTime === '0001-01-01T00:00:00'? '尚未審核' : ToDate(data.reviewTime) }</td>              
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
    const [orderBy, setOrderBy] = useState('')
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 5
    const endOffset = itemOffset + itemPerPage;
    const currentItems = queryData.data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(queryData.data.length / itemPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % queryData.data.length;
        setItemOffset(newOffset);
    };

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
        if(startDate === '' || startDate === null){
            alert('請輸入必要條件')
            return
        }
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
                            required={false}
                            disabled={false}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">排序條件</label>
                        <Select value={orderBy} className="item-1 form-control"
                                        onChange={(e) => setOrderBy(e.target.value)}
                                        showDefault>
                                    
                                    <option value={'UnitID'}>{'單位代號'}</option>
                                    <option value={'StartTime'}>{'申請日期'}</option>
                                    <option value={'ReviewTime'}>{'倉庫審核日期'}</option>                                   
                        </Select>
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
                       {
                         currentItems.map((para, index) => 
                         <List data={para} key={index}/>
                        )
                       }                                               
                    </tbody>
                </Table>
                {
                    pageCount > 2 &&
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="下一頁 >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< 上一頁"
                        renderOnZeroPageCount={null}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                }
            </div>
        </Layout>
    )
}

export default QueryView