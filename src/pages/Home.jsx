import React, { useEffect, useState } from 'react'
import axios from "axios";
import {MdPostAdd} from 'react-icons/md'
import { useGetUserID } from '../hooks/useGetUserID';
import {AiOutlineFileDone} from 'react-icons/ai'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import {AiOutlineClockCircle} from 'react-icons/ai'
import {toast,ToastContainer} from 'react-toastify';


const Home = () => {

  const [recipes,setRecipes]=useState([]);
  const [savedRecipes,setSavedRecipes]=useState([]);
  const userID=useGetUserID();
  const [cookies,_]=useCookies(["access_token"]);
  const navigate=useNavigate();


  const saveRecipe=async (recipeID)=>{
    try {
      const response=await axios.put("https://recipeapi-7ex8.onrender.com/recipes",{recipeID,userID,type:"save"},{headers:{authorization:cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes);
      toast.success("The recipe saved !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      
    } catch (err) {
      console.error(err)
      
    }
    

  };



  useEffect(()=>{
    
    const fetchRecipe = async()=>{

      try {
        const response=await axios.get("https://recipeapi-7ex8.onrender.com/recipes");
        setRecipes(response.data)
        console.log("Fetched recipes",response.data);
        
      } catch (err) {
        console.error(err)
        
      }

    }

    const fetchSavedRecipe = async()=>{

      try {
        const response=await axios.get(`https://recipeapi-7ex8.onrender.com/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        console.log("Fetched saved recipes",response.data.savedRecipes);
        
      } catch (err) {
        console.error(err)
        
      }

    }

    fetchRecipe();
    if(cookies.access_token) fetchSavedRecipe();
   

  },[])
  return (
    <div>
      <ToastContainer />
      <h1 className='text-center text-2xl font-semibold mb-2'>Recipes</h1>
      <div className='grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-4 gap-2 px-2'>
        {recipes.map((recipe)=>(

          <div key={recipe._id} className='col-span-1 border relative flex flex-col items-center' >
            <h2 className='font-semibold text-lg text-center py-2 cursor-pointer' onClick={()=>navigate(`/recipe/${recipe._id}`)}>{recipe.name}</h2>
            {/* <div>{recipe.instructions}</div> */}
            <img src={recipe.imageUrl} alt={recipe.name} className='cursor-pointer w-full h-[35vh] object-cover '  onClick={()=>navigate(`/recipe/${recipe._id}`)} />
            <div className='flex justify-between py-1 w-full'><div className='text-sm flex-1 flex flex-col items-center'><span className='font-semibold'>Preparation Time</span><div><AiOutlineClockCircle className='inline text-lg text-rose-500'/> {recipe.preparationTime} minutes</div></div><div className='text-sm flex-1 flex flex-col items-center'><span className='font-semibold'>Cooking Time</span><div><AiOutlineClockCircle className='inline text-lg text-rose-500'/> {recipe.cookingTime} minutes</div></div></div>
            {cookies.access_token && (savedRecipes.includes(recipe._id)?<AiOutlineFileDone className='top-2 right-2 absolute text-rose-700 text-xl'/>:<MdPostAdd className='top-2 right-2 absolute text-rose-700 text-xl cursor-pointer' onClick={()=>saveRecipe(recipe._id)}/>)}


          </div>


        ))}
      
      </div>
      
    </div>
  )
}

export default Home