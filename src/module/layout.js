import React from 'react'

import Header from '../component/header'
import Footer from '../component/footer'
import Main from '../component/main'
import Navbar from '../component/navbar'



const Layout = ({ children }) => {

    return (
        <React.Fragment>
            <Header />
            <Navbar/>
            <Main>
                {children}
            </Main>
            <Footer />
        </React.Fragment>
    )
}

export default Layout;