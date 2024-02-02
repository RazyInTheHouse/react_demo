import { useState } from 'react'
import axios from 'axios'
import config from '../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../redux/userSlice'
import { useNavigate } from "react-router-dom";
import loginTypeEnum from '../enum/loginType'

    

    export const NonAuthPost = async (url, input) => {
        const axiosSetting =
        {
            baseURL: config.HOST,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 30000,
            responseType: 'json',
        }
        const res = await axios.post(url, input, axiosSetting);
        return res.data
    };

    export const AuthPost = async (url, input) => {
        const accessToken = localStorage.getItem('accessToken')
        const axiosSetting =
        {
            baseURL: config.HOST,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            timeout: 30000,
            responseType: 'json',
        }
        try {
            const res = await axios.post(url, input, axiosSetting);
            return res.data
        } catch (err) {
            if (!err.response) {
                if (err.message.includes("timeout")) {
                    throw '請求逾時，請稍後再試'
                } else if (err.toString().includes("Network Error")) {
                    throw '網路異常，請稍後再試'
                } else {
                    throw err.message
                }
            }

            if (err.response.status === 401) {
                throw '您尚未登入，或您的登入已逾時，請重新登入後再試'
            } else {
                throw err.response.data
            }
        }
    };

    export const AuthGet = async (url) => {
        const accessToken = localStorage.getItem('accessToken')
        const axiosSetting =
        {
            baseURL: config.HOST,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            timeout: 30000,
            responseType: 'json',
        }
        try {
            const res = await axios.get(url, axiosSetting);
            return res
        } catch (err) {
            if (!err.response) {
                if (err.message.includes("timeout")) {
                    throw '請求逾時，請稍後再試'
                } else if (err.toString().includes("Network Error")) {
                    throw '網路異常，請稍後再試'
                } else {
                    throw err.message
                }
            }

            if (err.response.status === 401) {
                throw '您尚未登入，或您的登入已逾時，請重新登入後再試'
            } else {
                throw err.response.data
            }
        }
    };

export function useFlowLogin() {
    const dispatch = useDispatch()
    const [isQuery, setIsQuerying] = useState(false);
    const navigate = useNavigate()
    const login = async (input) => {
        setIsQuerying(true);
        let data = await NonAuthPost('security/testLogin', input)
        const { user: { }, ...dataWithoutUser } = data
        const { accessToken } = data
        localStorage.setItem('accessToken', accessToken)
        dispatch(setData({
            ...data.user,
            accessToken,
            loginType: loginTypeEnum.Login,
            isTimeout: false,
            isLogin: true,
            lastAccessTime: new Date()
        }))
        navigate('/')
    }
    return { isQuery, login }
}  