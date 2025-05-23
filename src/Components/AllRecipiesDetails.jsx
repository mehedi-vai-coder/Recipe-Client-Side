import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useParams } from "react-router";


const RecipeDetails = () => {
    const { id } = useParams();
    const recipeData = useLoaderData();
    const [recipe, setRecipe] = useState(recipeData);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/recipies/${id}`) // Replace with real API
            .then((res) => {
                setRecipe(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch recipe.");
                setLoading(false);
            });
    }, [id]);

    const handleLike = () => {
        setLiked(true); // Like button clicked, now disable it
        // Optional: post like to server
        // axios.post(`/api/like/${id}`);
    };

    if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
    if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
    if (!recipe) return <p style={{ padding: "20px" }}>Recipe not found.</p>;

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "30px" }}>
            <img src={recipe.image} alt="" />
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>{recipe.cuisineType
            }</h2>
            <p><b>Description:</b> {recipe.categories}</p>
            <p><b>Cook Time:</b> {recipe.prepTime}</p>
            <p><b>Difficulty:</b> {recipe.cuisine}</p>
            <p><b>Ingredients:</b> {recipe.ingredients}</p>
            <p><b>Instructions:</b> {recipe.instructions}</p>

            <button
                onClick={handleLike}
                disabled={liked}
                style={{
                    marginTop: "30px",
                    padding: "10px 20px",
                    backgroundColor: liked ? "#e63946" : "#1d3557",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: liked ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}
            >
                {liked ? "Liked ❤️" : "Like ❤️"}
            </button>
        </div>
    );
};

export default RecipeDetails;
