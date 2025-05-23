import React, { useState } from "react";
import Swal from "sweetalert2";

const AddRecipe = () => {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        ingredients: "",
        instructions: "",
        cuisineType: "",
        preparationTime: "",
        categories: [],
        likeCount: 0,
    });

    const categoriesList = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];
    const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        const updatedCategories = checked
            ? [...formData.categories, value]
            : formData.categories.filter((cat) => cat !== value);

        setFormData({ ...formData, categories: updatedCategories });
    };

    const handleSubmit = (e) => {
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
                if (data.insertedId) {
                    console.log('After adding Coffee to db', data)
                    Swal.fire({
                        title: "Recipe Added successfully.",
                        icon: "success",
                        draggable: true
                    });
                    form.reset();
                }
            });
        console.log(formData); // will replace with API call
    };

    return (
        <div className="max-w-2xl mx-auto p-8 shadow-2xl rounded-2xl mt-10
        text-black dark:text-white  bg-white dark:bg-black
        ">
            <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">🍽️ Add a New Recipe</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />

                <textarea
                    name="ingredients"
                    placeholder="Ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />

                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />

                <select
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                >
                    <option value="">Select Cuisine Type</option>
                    {cuisineTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <input
                    type="number"
                    name="preparationTime"
                    placeholder="Preparation Time (in minutes)"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />

                <fieldset className="border rounded-xl p-4">
                    <legend className="text-lg font-semibold mb-2 text-indigo-500">Select Categories</legend>
                    <div className="flex flex-wrap gap-4">
                        {categoriesList.map((cat) => (
                            <label key={cat} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={cat}
                                    onChange={handleCheckbox}
                                    checked={formData.categories.includes(cat)}
                                    className="accent-indigo-600"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
                >
                    ➕ Add Recipe
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;
