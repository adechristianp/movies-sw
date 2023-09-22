import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout";
import DetailPage from './pages/detail';
import DashboardPage from './pages/dashboard';
import CartPage from './pages/cart';
import NotFoundPage from './pages/not-found';
import { AppProvider } from "./utils/app";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout titleHeader="Movie Catalog">
          <DashboardPage />
        </Layout>
      ),
    },
    {
      path: "/detail/:id",
      element: (
        <Layout titleHeader="Movie Detail" canBack>
          <DetailPage />
        </Layout>
      ),
    },
    {
      path: "/cart",
      element: (
        <Layout titleHeader="Cart" canBack>
          <CartPage />
        </Layout>
      ),
    },
  ]);
  
  return (
    <AppProvider>
      <RouterProvider router={router} fallbackElement={<NotFoundPage />} />
    </AppProvider>
  );
}

export default Routes;
