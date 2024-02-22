import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from '../component/link'
import { setShowSidebar } from '../redux/globalSlice'
import { logout } from '../redux/globalSlice'
import roleEnum from '../enum/role'


const Navbar = () => {
    const dispatch = useDispatch()
    const { role, isTimeout } = useSelector(s => s.user)
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

    const handleCloseSidebar = () => {
        dispatch(setShowSidebar(false))
    }

    return (
        <React.Fragment>
            <div className={`sidebar-mask ${showSidebar ? 'show' : ''}`} onClick={() => dispatch(setShowSidebar(false))}>
            </div>
            <nav id="navbar" className={`${stickyNavbar} ${showSidebar ? 'show' : ''}`}>
                {!isTimeout &&
                        <div className="nav-container">
                            <Link to="/" onClick={handleCloseSidebar}>首頁</Link>                            
                            <Link to="/query" onClick={handleCloseSidebar}>申請案件查詢</Link>                            
                            <Link to="/statistic" onClick={handleCloseSidebar}>申請數量統計</Link> 
                            {
                               ( role === roleEnum.Admin || role === roleEnum.Warehouse ) && 
                                <React.Fragment>                                  
                                    <Link to="/maintain" onClick={handleCloseSidebar}>印刷品項維護</Link>                                                                        
                                    <Link to="/review" onClick={handleCloseSidebar}>倉庫審核作業</Link>
                                </React.Fragment>    
                            }
                        </div>
                }         
            </nav>
        </React.Fragment>
    )
}

export default Navbar;