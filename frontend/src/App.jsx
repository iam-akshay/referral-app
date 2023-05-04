import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddAppsPage, AppsPage, LoginPage } from './pages';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: '/apps',
      element: <AppsPage />
    },
    {
      path: '/apps/add',
      element: <AddAppsPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
