import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Movie from "./pages/Movie";




export default function App() {




  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true, 
          element: <Home />,

        },
        {
          path: "/movies/:id",
          element: <Movie />
        },
        {
          path: "*",
          element: <ErrorPage />
        }

      ]
        
}]);

  return <RouterProvider router = {router} fallbackElement={ <div>Loading ...</div> }/>


}

