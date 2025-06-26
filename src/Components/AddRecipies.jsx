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
    });
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        // Basic validation before submit
        if (
            !formData.image ||
            !formData.title ||
            !formData.ingredients ||
            !formData.instructions ||
            !formData.prepTime
        ) {
            toast.error("Please fill all required fields!");
            setLoading(false);
            return;
        }

        try {
            // Add userId if stored in localStorage
            const user = JSON.parse(localStorage.getItem("user"));
            const payload = {
                ...formData,
                likeCount: 0,
                userId: user?._id || "guest",
            };

            const res = await axios.post(
                "https://recipe-server-side-five.vercel.app/recipes",
                payload
            );

            if (res.data.insertedId || res.status === 200) {
                Swal.fire({
                    title: "Recipe Added Successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    draggable: true,
                    background: "#34D399", // Tailwind green-400 for style
                    color: "#fff",
                });

                toast.success("Recipe added!");
                setFormData({
                    image: "",
                    title: "",
                    ingredients: "",
                    instructions: "",
                    cuisine: "Italian",
                    prepTime: "",
                    categories: [],
                });

                navigate("/myrecipe");
            } else {
                throw new Error("Failed to add recipe");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">
                Add New Recipe
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
                <textarea
                    name="ingredients"
                    placeholder="Ingredients (comma separated)"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                    <label className="font-semibold mb-2 sm:mb-0">Cuisine Type:</label>
                    <select
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    >
                        {cuisineOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="number"
                    name="prepTime"
                    placeholder="Preparation Time (minutes)"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    value={formData.prepTime}
                    onChange={handleChange}
                    required
                    min={1}
                />

                <div>
                    <label className="font-semibold">Categories:</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {categoryOptions.map((cat) => (
                            <label
                                key={cat}
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={cat}
                                    checked={formData.categories.includes(cat)}
                                    onChange={handleChange}
                                    className="cursor-pointer"
                                />
                                <span className="dark:text-gray-200">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md text-white font-semibold transition ${loading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {loading ? "Adding Recipe..." : "Add Recipe"}
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;
