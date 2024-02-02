import React from "react";

const Loader = ({ show }) => {
    return(
        <div className={`loader-mask ${show ? 'show' : ''}`}>
            <div className="loader">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader;