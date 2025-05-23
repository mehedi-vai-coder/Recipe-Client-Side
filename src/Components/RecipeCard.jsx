import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const RecipeCard = ({ recipe,setRecipes,recipes}) => {
    // console.log(recipe, recipes)
    const { image, title, cuisineType, instructions, ingredients, _id } = recipe;
    const handleDelete = (_id) => {
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // start deleting the recipe
                fetch(`http://localhost:3000/recipies/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('after delete', data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Recipe has been deleted.",
                                icon: "success"
                            });
                            // Remove the recipe from the state 
                          const remainingRecipe =recipes.filter(res => res._id !== _id)
                          setRecipes(remainingRecipe);
                        }
                    })

            }
        });
    }
    return (
        <div className="card card-side bg-base-100 shadow-sm dark:text-black">
            <figure>
                <img
                    src={image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{instructions}</p>
                <h4>{cuisineType}</h4>
                <h4>{ingredients}</h4>
                <div className="card-actions justify-end">
                    <Link to={`/recipedetails/${_id}`}>
                        <button className="btn btn-primary">View</button>
                    </Link>
                    <Link to={`/updaterecipe/${_id}`}>
                        <button className="btn btn-success">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(_id)} className="btn btn-warning">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;