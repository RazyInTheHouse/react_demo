import { useNavigate } from "react-router-dom";

const BackButton = ({className, text = '回前頁修改' }) => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <button className={`btn ${className}`} onClick={handleBack}>{text}</button>
    )
}
export default BackButton