import { Navigate, useRoutes } from 'react-router-dom';
import { Guest, Protected } from '../middleware'
import DashboardLayout from '../layouts/DashboardLayouts'
import {
  Login,
  Register,
  Home,
  Product,
  NewProduct,
  NotFound,
  Supplier,
  NewSupplier,
  EditSupplier
} from '../pages'


export default function MainRouter() {
  const routes = useRoutes([
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
        { path: 'product/new', element: <NewProduct />},
        { path: 'supplier', element: <Supplier />},
        { path: 'supplier/new', element: <NewSupplier />},
        { path: 'supplier/:id', element: <EditSupplier />},
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
}