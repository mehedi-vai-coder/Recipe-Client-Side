import { useState } from "react";

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

    const handleAddRecipe = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newRecipe = Object.fromEntries(formData.entries());
        console.log(newRecipe);

        // send Recipe data to the db 
        fetch('http://localhost:3000/recipies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })
            .then(res => res.json())
            .then(data => {
                console.log('After adding recipe', data)
            })
    };

    return (
        <form onSubmit={handleAddRecipe} className="max-w-lg mx-auto p-4 space-y-4 bg-white shadow rounded-xl">
            <h2 className="text-2xl font-semibold text-center">Add a New Recipe</h2>
            <div>
                <label className="block">Image URL</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
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
                    value={formData.title}
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
                    value={formData.ingredients}
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
                    value={formData.instructions}
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
                    value={formData.cuisineType}
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
                    value={formData.preparationTime}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block font-medium">Like Count</label>
                <input
                    type="number"
                    name="likeCount"
                    value={formData.likeCount}
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
                                value={category}
                                checked={formData.categories.includes(category)}
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
                Add Recipe
            </button>
        </form>
    );
}
