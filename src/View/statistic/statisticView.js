import React, { useEffect, useState } from 'react';
import Layout from '../../module/layout';
import { useDispatch, useSelector } from "react-redux";
import QueryPanel from '../../module/queryPanel';
import Table from '../../module/table';
import { DatePicker } from '../../component/datePicker';
import { QueryAction } from '../../thunk/statisticThunk';
import { reset } from '../../redux/statisticSlice';
import OrganizationSelector from '../../module/organizationSelector';
import PrintItemSelector from '../../module/printItemSelector';
import ReactPaginate from 'react-paginate';


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
    const [unitID, setUnitID] = useState('')
    const [itemID, setItemID] = useState('')
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 2
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
        if((itemID === '' || itemID === undefined ) && (unitID === '' || unitID === undefined )){
            alert('品名名稱及單位名稱需填寫其中一欄')
            return
        }
        let input = {
            reviewTimeBegin: startDate,
            reviewTimeEnd: endDate, 
            itemID: itemID,
            unitID: unitID,
            isExport: false,
        }
        dispatch(QueryAction(input))
    }

    const handleExport = () =>{
        if(queryData.data.length === 0){
            alert('請先查詢資料')
            return
        }
        let input = {
            reviewTimeBegin: startDate,
            reviewTimeEnd: endDate, 
            itemID: itemID,
            unitID: unitID,
            isExport: true,
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
                            handleCloseCalendar={handleStartDateChange}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">倉庫審核通過日期迄</label>
                        <DatePicker initialValue={endDate}
                            className="form-control"
                            handleCloseCalendar={handleEndDateChange}
                        />
                    </div>
                    <div className="item-1">
                        <label className="item-form-title form-title">品名名稱</label>
                        <PrintItemSelector 
                            className="form-control"
                            constraint={[]}
                            value={itemID}
                            onSubmit={item => setItemID(item?.itemID)}
                            required={false}
                            disabled={false}
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
                </QueryPanel>

                <button className="btn btn-info" onClick={handleExport}>匯出</button>
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
                        {currentItems.map((para, index)=>
                            <List data={para} key={index} />
                        )}
                    </tbody>
                </Table>
                {
                    pageCount >= 2 &&
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

export default StatisticView