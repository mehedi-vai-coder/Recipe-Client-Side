import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddRecipe = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        ingredients: "",
        instructions: "",
        cuisine: "Italian",
        prepTime: "",
        categories: [],
        likeCount: 0,
    });

    const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];
    const cuisineOptions = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                categories: checked
                    ? [...prev.categories, value]
                    : prev.categories.filter((cat) => cat !== value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newRecipe = Object.fromEntries(formData.entries());
        

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
                    // console.log('After adding Coffee to db', data)
                    navigate(`${location.state ? location.state : "/myrecipe"}`)
                    Swal.fire({
                        title: "Recipe Added successfully.",
                        icon: "success",
                        draggable: true
                    });
                    form.reset();
                }
            });
        // console.log(formData); 
        try {
            const user = JSON.parse(localStorage.getItem("user")); 
            const res = await axios.post("http://localhost:3000/recipies",
                console.log(res), {
                ...formData,
                userId: user?._id || "guest",
            });
            toast.success("Recipe added successfully!");
            setFormData({
                image: "",
                title: "",
                ingredients: "",
                instructions: "",
                cuisine: "Italian",
                prepTime: "",
                categories: [],
                likeCount: {
                    type: Number,
                    default: 0, 
                },
                userId: String, 
            });
        } catch (error) {
            toast.error("Failed to add recipe");
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow dark:text-black">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    className="w-full p-2 border rounded"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    className="w-full p-2 border rounded"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="ingredients"
                    placeholder="Ingredients (comma separated)"
                    className="w-full p-2 border rounded"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    className="w-full p-2 border rounded"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                />

                <div className="flex items-center gap-4">
                    <label className="font-semibold">Cuisine Type:</label>
                    <select
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    >
                        {cuisineOptions.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="number"
                    name="prepTime"
                    placeholder="Preparation Time (minutes)"
                    className="w-full p-2 border rounded"
                    value={formData.prepTime}
                    onChange={handleChange}
                    required
                />

                <div>
                    <label className="font-semibold">Categories:</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {categoryOptions.map((cat) => (
                            <label key={cat} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={cat}
                                    checked={formData.categories.includes(cat)}
                                    onChange={handleChange}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                    Add Recipe
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;
