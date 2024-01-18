

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginView from './View/login'
import HomeView from './View/homeView'
import QueryAppliedView from "./View/queryAppliedView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomeView />} />
      <Route path="/testlogin" element={<LoginView />} />
      <Route path="/queryApplied" element={<QueryAppliedView />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
