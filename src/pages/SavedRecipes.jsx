import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useCookies } from "react-cookie";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipeapi-x7x0.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log("Fetched saved recipes", response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  const deleteRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipeapi-x7x0.onrender.com/recipes",
        { recipeID, userID, type: "delete" },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mb-2">Saved Recipes</h1>
      <div className="grid grid-cols-5 gap-2 px-2 max-sm:grid-cols-1">
        {savedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="col-span-1 border relative flex flex-col items-center"
          >
            <h2
              className="font-semibold text-lg text-center py-2 cursor-pointer"
              onClick={() => navigate(`/recipe/${recipe._id}`)}
            >
              {recipe.name}
            </h2>
            {/* <div>{recipe.instructions}</div> */}
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="cursor-pointer w-full h-[35vh] object-cover "
              onClick={() => navigate(`/recipe/${recipe._id}`)}
            />
            <div className="flex justify-between py-1 w-full">
              <div className="text-sm flex-1 flex flex-col items-center">
                <span className="font-semibold">Preparation Time</span>
                <div>
                  <AiOutlineClockCircle className="inline text-lg text-rose-500" />{" "}
                  {recipe.preparationTime} minutes
                </div>
              </div>
              <div className="text-sm flex-1 flex flex-col items-center">
                <span className="font-semibold">Cooking Time</span>
                <div>
                  <AiOutlineClockCircle className="inline text-lg text-rose-500" />{" "}
                  {recipe.cookingTime} minutes
                </div>
              </div>
            </div>
            <AiOutlineDelete
              onClick={() => deleteRecipe(recipe._id)}
              className="absolute top-2 right-2 text-rose-700 text-xl cursor-pointer"
            />
          </div>
        ))}
      </div>
      {savedRecipes.length === 0 && (
        <div className="text-lg text-center">There is no saved recipes.</div>
      )}
    </div>
  );
};

export default SavedRecipes;
