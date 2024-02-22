import React, { useState } from "react";

const SignPopup = (props) => {
    const { formNo, isShow, onClosePopup, onSubmit } = props
    const [opinion, setOpinion] = useState('')
    const handleClosePopup = () => {
        onClosePopup(false)
    }
    const handleSubmit = () => {
        onSubmit(formNo, opinion)
        setOpinion('')
    }

    return (
        <div className={`popup-mask ${isShow ? 'show' : ''}`}>
            <div className="popup">
                <div className="popup-header">
                    <h2>{`請填寫退回原因`}</h2>
                    <i className="close fas fa-times" onClick={handleClosePopup}></i>
                </div>
                <div className="popup=body">
                    <div className="popup-content">
                        <div className="item-1">
                            <textarea rows={4} className="form-control" value={opinion} onChange={e => setOpinion(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className="popup-bottom align-center">
                    <button className="btn btn-primary" onClick={handleSubmit}>確定送出</button>
                    <button className="btn btn-primary" onClick={handleClosePopup}>取消</button>
                </div>
            </div>
        </div>
    )
}

export default SignPopup