const config = {
    "ENV": process.env.REACT_APP_ENV,
    "SUB_DIRECTORY": "PrintWeb",
    "MOCK_API": true,
    "MOCK_HOST": false,
    "EXPORT_STORE": true,
    "DEBUG": true,
    "HOST": process.env.REACT_APP_ENV === 'local' ? "https://localhost:44312/api" :
            process.env.REACT_APP_ENV === 'dev' ? "https://itattap.skl.com.tw/printapi/api" :
            process.env.REACT_APP_ENV === 'prod' ? "https://ipattweb.skl.com.tw/printapi/api" : ""

}
export default config