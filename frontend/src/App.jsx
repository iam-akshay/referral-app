import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppsPage, LoginPage } from './pages';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: '/apps',
      element: <AppsPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
