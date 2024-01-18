import Layout from '../module/layout';
import { FormInfoBox } from '../module/homebox'
const HomeView = () => {
    return (
        <Layout>
            <div className="row mobile-hide" style={{ marginBottom: "16px" }}>
                <FormInfoBox className="item-1" />
                <FormInfoBox className="item-1" />
                <FormInfoBox className="item-1" />
            </div>
        </Layout>
    )
}

export default HomeView