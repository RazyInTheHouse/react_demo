import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../component/header'
import Footer from '../component/footer'
import Main from '../component/main'
import Navbar from '../component/navbar'
import Loader from '../component/loader'
import Alert from '../component/alert'



const Layout = ({ children }) => {
    const { showLoading, showAlert, message } = useSelector(s => s.global)
    
    return (
        <React.Fragment>
            <Header />
            <Navbar/>
            <Main>
                {children}
            </Main>
            <Loader show={showLoading}/>
            <Alert show={showAlert} message={message} />
            <Footer />
        </React.Fragment>
    )
}

export default Layout;