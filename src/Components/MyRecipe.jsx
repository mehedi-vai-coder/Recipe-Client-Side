import { useLoaderData } from 'react-router-dom'; // react-router-dom always better
import RecipeCard from './RecipeCard';
import { useState, useEffect } from 'react';

const MyRecipe = () => {
    const allRecipes = useLoaderData();
    const [recipes, setRecipes] = useState([]);

    // sync initial data only once on mount
    useEffect(() => {
        setRecipes(allRecipes);
    }, [allRecipes]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {recipes.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-20">
                    You have no recipes yet. Start adding your favorite recipes!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-20">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                            recipes={recipes}
                            setRecipes={setRecipes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRecipe;
