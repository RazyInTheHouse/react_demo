import React, { useState } from 'react'
import { useFlowLogin } from '../hook/useApi'

const LoginView = () => {
    const { login } = useFlowLogin()
    const [empNo, setEmpNo] = useState('')
    const [majaja, setMajaja] = useState('Skl03458')

    const handleLogin = async () => {
        let input = {
            empNo, majaja
        }
        await login(input)
    }

    return (
        <div className="container">
            <div style={{ marginBottom: "24px" }}>
                <h1>印刷品申請系統</h1>
            </div>
            
            <div id="login">
                <div className="login-form">
                    <span className="fa fa-user"></span>
                    <input
                        autoFocus
                        type="account"
                        placeholder="電腦編號"
                        value={empNo}
                        onChange={(e) => setEmpNo(e.target.value)}
                        required
                    />
                    <input type="button" value="登入" onClick={handleLogin}/>
                </div>
            </div>
        </div>
        
    )
}


export default LoginView
