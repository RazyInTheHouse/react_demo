import React from "react";
import Layout from "../module/layout";
import { MainCenter } from "../component/main";

const TimeoutView = () => {
    return(
        <Layout>
            <MainCenter>
                <h1 className="h1">你無權限或已經登出，請重新登入</h1>
            </MainCenter>
        </Layout>
    )
}

export default TimeoutView