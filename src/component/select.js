import React from "react";

const Select = (props) => {
    const {
        children,
        className,
        showDefault, defaultText = '請選擇',
        ...otherProps
    } = props
    return(
        <select {...otherProps}
            className={`${className} icon-arrow-down`}
        >
            {showDefault && <option value=''>{defaultText}</option>}
            {children}
        </select>
    ) 
}
export default Select