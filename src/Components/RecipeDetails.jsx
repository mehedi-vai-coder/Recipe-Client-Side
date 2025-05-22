import React from 'react';
import { Link, useLoaderData } from 'react-router';

const RecipeDetails = () => {
    const data =useLoaderData();
    const { image, title, cuisineType, instructions, ingredients, _id } = data;
    console.log(data)
    return (
         <div className="card card-side bg-base-100 shadow-sm mt-30 mb-30">
            <figure>
                <img
                    src={image} />
            </figure>
            <div className='ml-10 p-5 space-y-5'>
                <h2 className="card-title text-3xl">{title}</h2>
                <p className='text-xl'>{instructions}</p>
                <h4 className='text-2xl font-bold'>{cuisineType}</h4>
                <h4>{ingredients}</h4>
                <div>
                    <Link to='/myrecipe'>
                        <button className="btn btn-success">Back to All My Recipies</button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;