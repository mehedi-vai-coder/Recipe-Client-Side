import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";


const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url =
                    selectedCuisine === "All"
                        ? "https://recipe-server-side-five.vercel.app/recipes"
                        : `https://recipe-server-side-five.vercel.app/recipes?cuisine=${selectedCuisine}`;
                const res = await axios.get(url);
                setRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            }
        };

        fetchData();
    }, [selectedCuisine]);

    const filteredRecipes =
        selectedCuisine === "All"
            ? recipes
            : recipes.filter((recipe) => recipe.cuisine === selectedCuisine);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-black text-black dark:text-white">
            <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
                All Recipes
            </h2>

            <div className="mb-6 text-center">
                <label className="mr-2 font-semibold dark:text-white text-black">
                    Filter by Cuisine:
                </label>
                <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                >
                    <option value="All">All</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRecipes.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="bg-white dark:bg-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {recipe.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {recipe.preparationTime} mins • {" "}
                                <span className="text-indigo-500 font-medium">
                                    {recipe.cuisineType}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                {recipe.ingredients.slice(0, 60)}...
                            </p>
                            <Link
                                to={`/specificrecipedetails/${recipe._id}`}
                                className="inline-block mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                See Details →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;
