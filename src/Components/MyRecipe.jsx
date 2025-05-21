import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import RecipeCard from './RecipeCard';

const MyRecipe = () => {
    const allRecipe = useLoaderData();
    const [recipes, setRecipes] = useState(allRecipe);


    return (
        <div>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-20'>
            {
                allRecipe.map(recipe =><RecipeCard
                     key={recipe._id} 
                     recipe={recipe}
                     recipes={recipes}
                     setRecipes={setRecipes}
                     ></RecipeCard>)
            }
           </div>
        </div>
    );
};

export default MyRecipe;