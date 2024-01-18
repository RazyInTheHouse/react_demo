import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Link = ({ to, query, hash, state, className, children, onClick }) => {

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick()
        }
    }

    return (
        <RouterLink
            to={{
                pathname: to,
                search: query,
                hash: hash,
                state: state
            }}
            className={className}
            onClick={handleClick}
        >{children}</RouterLink>
    )
}

export const useLocationState = () => {
    const locationState = useLocation().state
    return locationState
}

export default Link