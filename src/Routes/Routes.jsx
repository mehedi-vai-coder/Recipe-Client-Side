import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home";
import AddRecipies from "../Components/AddRecipies";
import MyRecipe from "../Components/MyRecipe";
import AllRecipe from "../Components/AllRecipe";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component:Home
      },
      {
        path:'addrecipe',
        Component:AddRecipies
      },
      {
        path:'myrecipe',
        Component:MyRecipe
      },
      {
        path:'allrecipe',
        Component:AllRecipe
      },
      
    ]
  },
]);