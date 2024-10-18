import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Movie from "./pages/Movie";
import Actors from "./pages/Actors";
import Actor from "./pages/Actor";
import AddMovie from "./pages/AddMovie";


import { useRoute } from "../hooks/RouteContext";

import '@picocss/pico'
import EditActor from "./pages/EditActor";
import Genres from "./pages/Genres";
import Page404 from "./pages/Page404";


export default function App() {

  const {setToggleDisabled} = useRoute();



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
          path: "/movies/new",
          element: <AddMovie />,
        },
        {
          path: "/movies/:id",
          element: <Movie />,
        },
        {
          path: "/actors",
          element: <Actors />,
        },
        {
          path: "/actors/:id",
          element: <Actor />,
        },
        {
          path: "/actors/:id/edit",
          element: <EditActor />
        },
        {
          path: "/genres",
          element: <Genres />
        },
        {
          path: '404',
          element: <Page404 />
        },
        {
          path: "/*",
          element: <ErrorPage />
        }

      ]
        
}]);

  return <RouterProvider router = {router} fallbackElement={ <div>Loading ...</div> }/>


}

