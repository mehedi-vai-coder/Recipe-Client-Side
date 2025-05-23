import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);


    // fatching data from server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/recipies");
                setRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
                🍴 All Recipes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
                            <p className="text-sm text-gray-500">
                                ⏱️ {recipe.preparationTime} mins • 🌍 {recipe.cuisineType}
                            </p>
                            <p className="text-sm text-gray-600">
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
