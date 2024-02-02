import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from '../component/link'
import { setShowSidebar } from '../redux/globalSlice'
import { logout } from '../redux/globalSlice'
import UserIcon from '../icon/userIcon'
import ExitIcon from '../icon/exitIcon'


const Navbar = () => {
    const dispatch = useDispatch()
    const { empName, isTimeout } = useSelector(s => s.user)
    const [stickyNavbar, setStickyNavbar] = useState('')
    const { showSidebar } = useSelector(s => s.global)


    useEffect(() => {
        window.addEventListener('scroll', detectStickyNavbar)
        return () => {
            window.removeEventListener('scroll', detectStickyNavbar)
        }
    }, [])

    const detectStickyNavbar = (e) => {
        var header = document.getElementsByTagName("header")[0];
        var sticky = header.offsetHeight 
        if (window.pageYOffset >= sticky) {
            setStickyNavbar('sticky-nav')
        } else {
            setStickyNavbar('')
        }
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleCloseSidebar = () => {
        dispatch(setShowSidebar(false))
    }

    return (
        <React.Fragment>
            <div className={`sidebar-mask ${showSidebar ? 'show' : ''}`} onClick={() => dispatch(setShowSidebar(false))}>
            </div>
            <nav id="navbar" className={`${stickyNavbar} ${showSidebar ? 'show' : ''}`}>
                {!isTimeout &&
                    <React.Fragment>                       
                        <div className="nav-container">
                            <Link to="/" onClick={handleCloseSidebar}>首頁</Link>                            
                            <Link to="/queryApplied" onClick={handleCloseSidebar}>申請案件查詢</Link>                            
                            
                            
                        </div>
                    </React.Fragment>    
                }         
            </nav>
        </React.Fragment>
    )
}

export default Navbar;