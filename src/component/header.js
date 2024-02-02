import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserIcon from '../icon/userIcon'
import ExitIcon from '../icon/exitIcon'
import { ReactComponent as MenuIcon } from '../svg/menu.svg';
import logo from '../image/logo.png'
import { setShowSidebar } from '../redux/globalSlice'
import { logout } from '../redux/globalSlice'
import useCheckTimeout from '../hook/useCheckTimeout';


const Header = () => {
    useCheckTimeout()
    const dispatch = useDispatch()
    const { empName, isTimeout } = useSelector(s => s.user)
    const handleRdirectToIndex = () => {
        //navigate('/')
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleOpenSidebar = () => {
        dispatch(setShowSidebar(true))
    }

    return (
        <header>
            <div className="header-container">
                <div className="item-menu cursor-pointer">
                    <MenuIcon onClick={handleOpenSidebar} />
                </div>
                <div className="logo-content">
                    <img src={logo} alt="Logo" className="logo cursor-pointer" onClick={handleRdirectToIndex} />
                    <div className="line"></div>
                    <span className="site-name">印刷品申請系統</span>
                </div>
                <div className="item-menu cursor-pointer">
                    <MenuIcon onClick={handleOpenSidebar} />
                </div>
                {!isTimeout &&
                    <div className="item-content mobile-hide">
                        <div className="item">
                            <UserIcon /> {empName}
                        </div>
                        <div className="line"></div>
                        <div className="item cursor-pointer" onClick={handleLogout}>
                            <ExitIcon /> {'登出'}
                        </div>
                    </div>  
                }              
            </div>
        </header>
    )
}

export default Header;