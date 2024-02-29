import React, { useState } from 'react';

const InputText = (props) => {

    const { value, onChange, ...otherProps } = props
    const [input, setInput] = useState(value)
    const [isTyping, setIsTyping] = useState(false)

    return(
        <input {...otherProps}
            value={input}
            onCompositionStart={() => {
                setIsTyping(true)
            }}
            onCompositionEnd={(e) => {
                setIsTyping(false)
                setInput(e.target.value)
                onChange(e)
            }}
            onChange={(e) => {
                if(!isTyping){
                    onChange(e)
                }
                setInput(e.target.value)
            }} />
    )
}

export default InputText