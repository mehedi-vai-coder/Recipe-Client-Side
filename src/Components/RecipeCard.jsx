import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RecipeCard = ({ recipe, recipes, setRecipes }) => {
    const { image, title, cuisineType, instructions, ingredients, _id } = recipe;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showClass: {
                popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://recipe-server-side-five.vercel.app/recipes/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            const remainingRecipes = recipes.filter((res) => res._id !== id);
                            setRecipes(remainingRecipes);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Recipe has been deleted.",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete recipe.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    return (
        <div className="card card-side bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300">
            <figure className="w-48 flex-shrink-0 overflow-hidden rounded-l-xl">
                <img
                    src={image || "https://via.placeholder.com/192x192?text=No+Image"}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
            </figure>

            <div className="card-body flex flex-col justify-between p-4">
                <div>
                    <h2 className="card-title text-xl font-semibold text-gray-900 dark:text-white truncate" title={title}>
                        {title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-1 line-clamp-3">
                        {instructions.length > 120
                            ? instructions.slice(0, 120) + "..."
                            : instructions}
                    </p>
                    <div className="mt-3 text-sm text-indigo-600 font-medium">
                        Cuisine: <span className="text-indigo-500">{cuisineType || "N/A"}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Ingredients: {ingredients || "N/A"}
                    </div>
                </div>

                <div className="card-actions justify-end mt-4 space-x-3">
                    <Link to={`/recipedetails/${_id}`}>
                        <button className="btn btn-primary px-4 py-2 rounded-md hover:brightness-110 transition">
                            View
                        </button>
                    </Link>
                    <Link to={`/updaterecipe/${_id}`}>
                        <button className="btn btn-success px-4 py-2 rounded-md hover:brightness-110 transition">
                            Update
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-warning px-4 py-2 rounded-md hover:brightness-110 transition"
                        aria-label={`Delete recipe ${title}`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
