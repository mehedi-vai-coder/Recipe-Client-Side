
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const RecipeCard = ({ recipe, recipes, setRecipes }) => {
    const { image, title, cuisineType, instructions, ingredients, _id } = recipe;
    const handleDelete = (id) => {
        console.log(id)
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
                fetch(`http://localhost:3000/recipies/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {

                            const remainingRecipies = recipes.filter(res => res._id !== id);
                            setRecipes(remainingRecipies);

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Recipe has been deleted.",
                                icon: "success"
                            });

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
                        <button className="btn btn-success" onClick={() => document.getElementById('my_modal_5').showModal()}>Update</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-success">Update</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </Link>
                    <Link >

                    </Link>
                    <button onClick={() => handleDelete(_id)} className="btn btn-warning">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;