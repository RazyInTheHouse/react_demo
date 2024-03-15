import { useNavigate } from "react-router-dom";

const BackButton = ({className, text = '回前頁' }) => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <button className={`btn ${className}`} onClick={handleBack}>{text}</button>
    )
}
export default BackButton