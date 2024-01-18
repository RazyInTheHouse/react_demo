import React from 'react'
import Link from '../component/link'


export const FormInfoBox = ({ className }) => {
    return (
        <div className={`${className} box`}>
            <h2 className="box-title">簽核表單</h2>

            <Link className="btn btn-sm btn-default btn-shadow right-top" to="/invokedList">已申請</Link>
            {/* <div className="form-info-content">
                待處理
                <span className="count">
                    <Link className="number" to="/todoList">
                        {listToDoInfo ?
                            listToDoInfo.length :
                            '-'
                        }
                    </Link>件
                </span>
            </div> */}
        </div>
    )
}