import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home";
import AddRecipies from "../Components/AddRecipies";
import MyRecipe from "../Components/MyRecipe";
import AllRecipe from "../Components/AllRecipe";
import RecipeDetails from "../Components/RecipeDetails";
import UpdateRecipe from "../Components/UpdateRecipe"


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        loader: ()=> fetch('http://localhost:3000/recipies'),
        Component:Home
      },
      {
        path:'addrecipe',
        Component:AddRecipies
      },
      {
        path:'myrecipe',
        loader: ()=> fetch('http://localhost:3000/recipies'),
        Component:MyRecipe
      },
      {
        path:'recipedetails/:id',
        Component: RecipeDetails,
      },
      {
        path:'updaterecipe/:id',
        loader:({params})=> fetch(`http://localhost:3000/recipies/${params.id}`),
        Component: UpdateRecipe,
      },
      {
        path:'allrecipe',
        Component:AllRecipe
      },
      
      
    ]
  },
]);