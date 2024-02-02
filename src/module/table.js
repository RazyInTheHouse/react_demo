import React from "react";

const Table = ({children, className = '', scroll = true, responsive}) => {
    return(
        <div className={scroll ? `table-scroll`: ``}>
            <table className={`table ${responsive ? `table-scroll` : ``} ${className}`}>
                {children}
            </table>
        </div>
    )
}

export default Table