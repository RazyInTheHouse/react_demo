import React from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/globalSlice";

const Alert = ({ show, message }) => {
    const dispatch = useDispatch()
    return(
        <div className={`alert-mask ${show ? 'show' : ''}`}>
            <div className="alert">
                {message}
                <button onClick={() => dispatch(setData({ showAlert: false }))}>Close</button>
            </div>
        </div>
    )
}

export default Alert;