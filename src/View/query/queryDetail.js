import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../module/table";
import Layout from "../../module/layout";
import { QueryPrintApplyDetailAction } from "../../thunk/homeThunk";
import { useLocationState } from "../../component/link";
import ReactPaginate from 'react-paginate';


const List = ({ data }) => {
    return(
        <tr className="first-row last-row">
            <td data-title="序號">{data.sn}</td>
            <td data-title="品名編號">{data.itemID}</td>
            <td data-title="中文名稱">{data.itemName}</td>
            <td data-title="單位">{data.itemUnit}</td>
            <td data-title="申請數量">{data.applyQuantity}</td>
            <td data-title="架號">{data.shelfID}</td>
            <td data-title="核准數量">{data.approvedQuantity}</td>
            <td data-title="原因">{data.reason}</td>
        </tr>
    )
}

const QueryDetail = () => {
    const dispatch = useDispatch()
    const printApplyDetail = useSelector(s => s.queryPrintApplyDetail)
    const [detail, setDetail] = useState(printApplyDetail.detail)
    const [address, setAddress] = useState(printApplyDetail.address)
    const formData = useLocationState() 
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 2
    const endOffset = itemOffset + itemPerPage;
    const currentItems = detail.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(detail.length / itemPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % detail.length;
        setItemOffset(newOffset);
    };


    useEffect(()=>{
        dispatch(QueryPrintApplyDetailAction(formData.formNo))
    },[])

    useEffect(()=>{
        setDetail(printApplyDetail.detail)
        setAddress(printApplyDetail.address)
    },[printApplyDetail])

    return(
        <Layout>
            <div className="panel panel-default">
                <div className="new-row">
                    <div className="item-4 item-m-12 item-padding">
                        <div className="new-row">
                            <label className="item-form-title form-title">申請人</label>
                            <div className="item-full form-input">
                                <input type="text" className="btn btn-text" value={printApplyDetail.applyEmpName} disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="item-4 item-m-12 item-padding">
                        <div className="new-row">
                            <label className="item-form-title form-title">寄送地址</label>
                            <div className="item-full form-input">
                                <input type="text" className="btn btn-text" value={address} onChange={e => setAddress(e.target.value)} disabled={!formData.isEdit}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Table>
                    <thead>
                        <tr>
                            <th>序號</th>
                            <th>品名編號</th>
                            <th>中文名稱</th>
                            <th>單位</th>
                            <th>申請數量</th>
                            <th>架號</th>
                            <th>核准數量</th>
                            <th>原因</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data, index)=>
                            <List key={index} data={data} />
                        )}
                    </tbody>
                </Table>
                <h3 style={{ textAlign: "right" }}>總筆數：{printApplyDetail.detail.length}筆</h3>
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

export default QueryDetail