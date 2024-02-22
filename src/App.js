
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import route from "./route";
import LoginView from './view/login';
import TimeoutView from "./view/timeoutView";


const Router = () => {
  const { isTimeout } = useSelector(s => s.user)
  const router = createHashRouter(
    createRoutesFromElements(
      isTimeout?
      <Route>
        <Route path="/" element={<TimeoutView />} />
        <Route path="/Testlogin" element={<LoginView />} />
      </Route>
      :
      <Route>
        {
          route.map((item, index) => <Route key={index} path={item.path} element={<item.component />}></Route>)
        }
      </Route>
    )
  );
  return router
}

function App() {
  
  return (
    <div>   
      <RouterProvider router={Router()} />
    </div>
  );
}

export default App;
