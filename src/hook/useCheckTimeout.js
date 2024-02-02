import { useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTimeout } from "../redux/userSlice";
import { addHours, addMinutes } from "date-fns";

const useCheckTimeout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loginTime, lastAccessTime, isTimeout } = useSelector(s => s.user)

    useEffect(() => {
        const checkTimeout = (loginTime, lastAccessTime, isTimeout) => {
            if(!isTimeout){
                var nowTime = new Date()
                var tokenPeriod = 1
                const timeoutTime = addHours(new Date(lastAccessTime), tokenPeriod)
                if(timeoutTime.getTime() < nowTime.getTime()){
                    navigate('/')
                    dispatch(setTimeout())                    
                    return
                }
            }
        }
        let interval = setInterval(() => {
            checkTimeout(loginTime, lastAccessTime, isTimeout)
        }, 1000)
        return () => clearInterval(interval)
    }, [loginTime, lastAccessTime, isTimeout])
}

export default useCheckTimeout