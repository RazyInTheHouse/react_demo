import React from 'react'

const Main = ({ children }) => {
    return (
        <div className="main">
            <div className="main-container column">
                {children}
            </div>
        </div>
    )
}

export default Main;

export const MainCenter = ({ children }) => {
    return (
        <div style={{display: "flex", justifyContent:"center", alignItems:"center", flex: "1"}}>
            {children}
        </div>
    )    
}
