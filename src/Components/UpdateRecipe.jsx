import { useState } from "react";
import { useLoaderData } from "react-router";
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

    const [formData, setFormData] = useState({
        image: "",
        title: "",
        ingredients: "",
        instructions: "",
        cuisineType: "Italian",
        preparationTime: 0,
        categories: [],
        likeCount: 0
    });
    console.log(formData)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                categories: checked
                    ? [...prev.categories, value]
                    : prev.categories.filter((cat) => cat !== value)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "number" ? Number(value) : value
            }));
        }
    };

    const handleUpdateRecipe = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const UpdatedRecipe = Object.fromEntries(formData.entries());
        console.log(UpdatedRecipe);

        // send Recipe data to the db 
        fetch(`http://localhost:3000/recipies/${_id}`, {
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
                }
            });
    };

    return (
        <form onSubmit={handleUpdateRecipe} className="max-w-lg mx-auto p-4 space-y-4 bg-white shadow rounded-xl">
            <h2 className="text-2xl font-semibold text-center">Update Your Recipe</h2>
            <div>
                <label className="block">Image URL</label>
                <input
                    type="url"
                    name="image"
                    defaultValue={image}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block font-medium">Like Count</label>
                <input
                    type="number"
                    name="likeCount"
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-600"
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
                                value={category}
                                onChange={handleChange}
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
