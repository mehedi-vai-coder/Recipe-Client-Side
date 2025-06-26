import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // react-router-dom better for routing

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState("All");
    const [loading, setLoading] = useState(false);

    const cuisineOptions = ["All", "Italian", "Mexican", "Indian", "Chinese"];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url =
                    selectedCuisine === "All"
                        ? "https://recipe-server-side-five.vercel.app/recipes"
                        : `https://recipe-server-side-five.vercel.app/recipes?cuisine=${selectedCuisine}`;
                const res = await axios.get(url);
                setRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCuisine]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10 select-none">
                All Recipes
            </h2>

            <div className="mb-6 text-center">
                <label className="mr-2 font-semibold dark:text-white text-black select-none">
                    Filter by Cuisine:
                </label>
                <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300 cursor-pointer"
                    aria-label="Filter Recipes by Cuisine"
                >
                    {cuisineOptions.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                </div>
            ) : recipes.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
                    No recipes found.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="bg-white dark:bg-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer transform hover:-translate-y-1"
                        >
                            <img
                                src={recipe.image || "https://via.placeholder.com/400x300?text=No+Image"}
                                alt={recipe.title}
                                className="w-full h-48 object-cover rounded-t-2xl"
                                loading="lazy"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white truncate" title={recipe.title}>
                                    {recipe.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
                                    <span>{recipe.prepTime || recipe.preparationTime || "N/A"} mins</span>
                                    <span className="text-indigo-500 font-medium">{recipe.cuisine || recipe.cuisineType}</span>
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                    {recipe.ingredients?.length > 60
                                        ? recipe.ingredients.slice(0, 60) + "..."
                                        : recipe.ingredients || "No ingredients listed."}
                                </p>
                                <Link
                                    to={`/specificrecipedetails/${recipe._id}`}
                                    className="inline-block mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition"
                                    aria-label={`See details for ${recipe.title}`}
                                >
                                    See Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Loader CSS */}
            <style>
                {`
          .loader {
            border-top-color: #6366f1; /* indigo-500 */
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};

export default AllRecipes;
