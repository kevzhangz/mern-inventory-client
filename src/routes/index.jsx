import { Navigate, useRoutes } from 'react-router-dom';
import { Guest, Protected } from '../middleware'
import DashboardLayout from '../layouts/DashboardLayouts'
import {
  Login,
  Register,
  Home,
  Product,
  Supplier,
  Purchase,
  Sell,
  NotFound
} from '../pages'


export default function MainRouter() {
  const routes = useRoutes([
    {
      path: 'index.html',
      element: <Navigate to="/" />
    },
    {
      path: '/',
      element: <Guest><Login /></Guest>,
    },
    {
      path: 'register',
      element: <Guest><Register /></Guest>
    },
    {
      path: '/dashboard',
      element: <Protected><DashboardLayout /></Protected>,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'product', element: <Product />},
        { path: 'supplier', element: <Supplier />},
        { path: 'purchase', element: <Purchase />},
        { path: 'sell', element: <Sell />},
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
}