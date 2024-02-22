import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import zhTW from "date-fns/locale/zh-TW";

export const DatePicker = (props) => {
    const { initialValue, handleCloseCalendar, className, ...originProps } = props
    const [value, setValue] = useState(initialValue instanceof Date ? initialValue : initialValue ? new Date(initialValue) : undefined)
    useEffect(() => {
        setValue(initialValue instanceof Date ? initialValue : initialValue ? new Date(initialValue) : undefined)
    }, [initialValue])

    return (
        <div>
            <ReactDatePicker {...originProps}
                locale={zhTW}
                className={`${className} icon-calendar`}
                selected={value}
                onChange={handleCloseCalendar}
                fixedHeight
                disabledKeyboardNavigation
                dateFormat={"yyyy/MM/dd"}
            />
        </div>
    )
}