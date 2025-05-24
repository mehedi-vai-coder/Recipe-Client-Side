import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home";
import AddRecipies from "../Components/AddRecipies";
import AllRecipe from "../Components/AllRecipe";
import RecipeDetails from "../Components/RecipeDetails";
import UpdateRecipe from "../Components/UpdateRecipe"
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../Provider/PrivateRoute";
import MyRecipe from "../Components/MyRecipe"
import Loading from "../Components/Loading";
import Error from "../Pages/Error";
import AllRecipiesDetails from "../Components/AllRecipiesDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'addrecipe',
        element: <PrivateRoute>
          <AddRecipies></AddRecipies>
        </PrivateRoute>
      },
      {
        path: 'myrecipe',
        element: <PrivateRoute>
          <MyRecipe></MyRecipe>
        </PrivateRoute>,
        loader: () => fetch('http://localhost:3000/recipes'),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'recipedetails/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/recipes/${params.id}`),
        Component: RecipeDetails,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'updaterecipe/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/recipes/${params.id}`),
        Component: UpdateRecipe,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'allrecipe',
        Component: AllRecipe
      },
      {
        path: 'specificrecipedetails/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/recipes/${params.id}`),
        element: <PrivateRoute>
          <AllRecipiesDetails></AllRecipiesDetails>
        </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: "/*",
        element: <Error></Error>
      },


    ]
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        Component: Login
      },
      {
        path: '/auth/register',
        Component: Register
      },
    ]
  },
]);