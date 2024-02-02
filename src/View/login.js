import React, { useState } from 'react'
import { useFlowLogin } from '../hook/useApi'

const LoginView = () => {
    const { login } = useFlowLogin()
    const [empNo, setEmpNo] = useState('FB6693')
    const [majaja, setMajaja] = useState('Skl03458')

    const handleLogin = async () => {
        let input = {
            empNo, majaja
        }
        await login(input)
    }
    return (
        <div style={{ marginTop: "24px" }}>

            <span>帳號</span><input type='text' className='form-control form-control-3-1' value={empNo} onChange={(e) => setEmpNo(e.target.value)} />

            <button onClick={handleLogin}>login</button>
        </div>
    )
}


export default LoginView
