import LoginView from './view/login';
import TimeoutView from "./view/timeoutView";
import HomeView from './view/home/homeView';
import AppliedList from "./view/home/appliedList";
import PrintApplyDetail from "./view/home/printApplyDetail";
import Preview from "./view/home/preview";
import PendingList from "./view/home/pendingList";
import SendBackList from './view/home/sendBackList';
import QueryView from "./view/query/queryView";
import QueryDetail from './view/query/queryDetail';
import StatisticView from './view/statistic/statisticView';
import ReviewView from './view/review/reviewView';
import ReviewDetail from './view/review/reviewDetail';
import MaintainView from './view/maintain/maintainView';
import StockView from './view/stock/stockView';
import ConvertView from './view/convert/convertView';

const route = [    
    {
        path: '/Testlogin',
        component: LoginView,
    },
    {
        path: '/',
        component: HomeView,
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
    {
        path: '/Query',
        component: QueryView,
    },
    {
        path: '/QueryDetail',
        component: QueryDetail,
    },
    {
        path: '/Statistic',
        component: StatisticView,
    },
    {
        path: '/Review',
        component: ReviewView,
    },
    {
        path: '/ReviewDetail',
        component: ReviewDetail,
    },
    {
        path: '/Maintain',
        component: MaintainView,
    },
    {
        path: '/Stock',
        component: StockView,
    },
    {
        path: '/Convert',
        component: ConvertView,
    },
]

export default route