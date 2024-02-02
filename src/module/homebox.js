import React from 'react'
import Link from '../component/link'


export const FormInfoBox = ({ className }) => {
    return (
        <div className={`${className} box`}>
            <h2 className="box-title">申請表單</h2>
            <Link className="btn btn-sm btn-default btn-shadow right-top" to="/appliedList">已申請</Link>
        </div>
    )
}

export const PendingBox = ({ className, listPending }) => {
    return (
        <div className={`${className} box`}>
            <div className='form-info-content'>
                <h2 className="box-title">待簽核表單</h2>               
                <span className='count'>
                    <Link className='number' to='/pendingList'>
                        {
                            listPending ? listPending.length : '_' 
                        }
                    </Link>件
                </span>
            </div>
        </div>
    )
}

export const SendBackBox = ({ className, listSendBack }) => {
    return (
        <div className={`${className} box`}>
            <div className='form-info-content'>
                <h2 className="box-title">已退回表單</h2>               
                <span className='count'>
                    <Link className='number' to='/sendBackList'>
                        {
                            listSendBack ? listSendBack.length : '_' 
                        }
                    </Link>件
                </span>
            </div>
        </div>
    )
}