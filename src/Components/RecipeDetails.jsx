import React from 'react';
import { useLoaderData } from 'react-router';

const RecipeDetails = () => {
    const data =useLoaderData();
    console.log(data)
    return (
        <div>
            <h1>details</h1>
        </div>
    );
};

export default RecipeDetails;