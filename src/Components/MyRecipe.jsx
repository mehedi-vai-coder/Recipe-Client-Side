import { useLoaderData } from 'react-router';
import RecipeCard from './RecipeCard';
import { useState } from 'react';

const MyRecipe = () => {
    const allRecipes = useLoaderData();
    const [recipes, setRecipes] = useState(allRecipes);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mb-20'>
                {
                    allRecipes.map(recipe => <RecipeCard
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