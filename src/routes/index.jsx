import { Navigate, useRoutes } from 'react-router-dom';
import { Guest, Protected } from '../middleware'
import DashboardLayout from '../layouts/DashboardLayouts'
import {
  Login,
  Register,
  Home,
  Product,
  NewProduct,
  EditProduct,
  NotFound,
  Supplier,
  NewSupplier,
  EditSupplier,
  Purchase,
  NewPurchase,
  EditPurchase,
  Sell,
  NewSell,
  EditSell
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
        { path: 'product/:id', element: <EditProduct />},
        { path: 'supplier', element: <Supplier />},
        { path: 'supplier/new', element: <NewSupplier />},
        { path: 'supplier/:id', element: <EditSupplier />},
        { path: 'purchase', element: <Purchase />},
        { path: 'purchase/new', element: <NewPurchase />},
        { path: 'purchase/:id', element: <EditPurchase />},
        { path: 'sell', element: <Sell />},
        { path: 'sell/new', element: <NewSell />},
        { path: 'sell/:id', element: <EditSell />},
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
}