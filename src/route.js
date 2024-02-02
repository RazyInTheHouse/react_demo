import LoginView from './view/login';
import HomeView from './view/home/homeView';
import QueryAppliedView from "./view/queryAppliedView";
import AppliedList from "./view/home/appliedList";
import TimeoutView from "./view/timeoutView";
import PrintApplyDetail from "./view/home/printApplyDetail";
import Preview from "./view/home/preview";
import PendingList from "./view/home/pendingList";
import SendBackList from './view/home/sendBackList';

const route = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/Testlogin',
        component: LoginView,
    },
    {
        path: '/QueryApplied',
        component: QueryAppliedView,
    },
    {
        path: '/AppliedList',
        component: AppliedList,
    },
    {
        path: '/PrintApplyDetail',
        component: PrintApplyDetail,
    },
    {
        path: '/Preview',
        component: Preview,
    },
    {
        path: '/PendingList',
        component: PendingList,
    },
    {
        path: '/SendBackList',
        component: SendBackList,
    },
    {
        path: '/Timeout',
        component: TimeoutView,
    },

]

export default route