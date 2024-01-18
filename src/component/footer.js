import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="container footer-container">
                <p>©{(new Date).getFullYear()} 新光人壽股份有限公司版權所有<br className="tablet-above-hide" />All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;