import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import Layout from '../../module/layout';
import { DownloadAction } from '../../thunk/convertThunk';

const ConvertView = () => {
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState()
    const handleDownload = () => {
        dispatch(DownloadAction(selectedDate))
    }
    return(
        <Layout>
            <div className="panel panel-default">
                <div className="item-1">
                    <label className="item-form-title form-title">切件日期</label>
                    <input className="form-control form-control-3-1" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
                    <button className="btn btn-important" onClick={handleDownload}>下載</button>
                    <div>
                        <span style={{ color:"red" }}>EX:1130331</span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ConvertView