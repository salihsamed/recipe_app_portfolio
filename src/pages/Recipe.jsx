import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";

const Recipe = () => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipeapi-x7x0.onrender.com/recipes/recipe/${recipeID}`
        );
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <div className="flex flex-col max-sm:items-center w-[70%] max-sm:w-[90%] max-md:w-[85%] max-lg:w-[80%] max-xl:w-[75%] mx-auto border-x-4  border-rose-100 px-5 border-dashed min-h-screen py-5 gap-5">
      <h1 className="text-[2rem] font-semibold ">{recipe?.name}</h1>

      <img
        src={recipe.imageUrl}
        alt=""
        className="w-[15vw] max-sm:w-[65vw] max-md:w-[35vw] max-lg:w-[35vw] max-xl:w-[20vw] h-auto rounded-3xl"
      />

      <p>{recipe?.explanation}</p>

      <div>
        <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
        {recipe?.ingredients?.map((ingredient, index) => (
          <div key={index} className="mt-1">
            <span className="font-semibold">{index + 1}-</span>
            {ingredient}
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
        {recipe?.instructions?.map((instructions, index) => (
          <div key={index} className="mt-1">
            <span className="font-semibold">{index + 1}-</span>
            {instructions}
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <div className="flex-1 flex flex-col items-center">
          <div className="font-semibold text-gray-800 flex gap-2 items-center">
            <AiOutlineClockCircle className="text-rose-700" />
            Preparation Time
          </div>
          <div>{recipe?.preparationTime} minutes</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="font-semibold text-gray-800 flex gap-2 items-center">
            <AiOutlineClockCircle className="text-rose-700" />
            Cooking Time
          </div>
          <div>{recipe?.cookingTime} minutes</div>
        </div>
      </div>
      <div className="text-center">
        Created by{" "}
        <span className="text-rose-700">{recipe?.userOwner?.username}</span>
      </div>
    </div>
  );
};

export default Recipe;
