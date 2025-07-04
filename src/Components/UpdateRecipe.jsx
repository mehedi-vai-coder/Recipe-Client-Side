// import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
// Itam list
const initialCategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Vegan"
];

// type of item
const cuisineOptions = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

export default function RecipeForm() {
    const { _id, image, title, ingredients, instructions, cuisineType, preparationTime, categories } = useLoaderData();
    const navigate = useNavigate();

    const handleUpdateRecipe = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const UpdatedRecipe = Object.fromEntries(formData.entries());
        console.log(UpdatedRecipe);

        // send Recipe data to the db 
        fetch(`https://recipe-server-side-five.vercel.app/recipes/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpdatedRecipe)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Recipe Updated Successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`${location.state ? location.state : "/myrecipe"}`)
                }
            });
    };

    return (
        <form onSubmit={handleUpdateRecipe} className="max-w-lg mx-auto p-4 space-y-4 bg-white shadow rounded-xl dark:text-black">
            <h2 className="text-2xl font-semibold text-center">Update Your Recipe</h2>
            <div>
                <label className="block">Image URL</label>
                <input
                    type="url"
                    name="image"
                    defaultValue={image}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div>
                <label className="block">Title</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={title}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block">Ingredients (comma separated)</label>
                <input
                    type="text"
                    name="ingredients"
                    defaultValue={ingredients}
                    placeholder="e.g., eggs, sugar, flour"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block">Instructions</label>
                <textarea
                    name="instructions"
                    defaultValue={instructions}
                    required
                    className="w-full p-2 border rounded"
                    rows="4"
                />
            </div>

            <div>
                <label className="block">Cuisine Type</label>
                <select
                    name="cuisineType"
                    defaultValue={cuisineType}
                    className="w-full p-2 border rounded"
                >
                    {cuisineOptions.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block">Preparation Time (minutes)</label>
                <input
                    type="number"
                    name="preparationTime"
                    defaultValue={preparationTime}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block">Categories</label>
                <div className="flex flex-wrap gap-2">
                    {initialCategories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                defaultValue={categories}
                            />
                            <span>{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Update Recipe
            </button>
        </form>
    );
}
