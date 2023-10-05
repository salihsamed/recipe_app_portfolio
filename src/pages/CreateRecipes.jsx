import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from 'react-cookie'
import {BiMinus} from 'react-icons/bi'

const CreateRecipes = () => {

    const userID=useGetUserID();
    const [cookies,_]=useCookies(["access_token"])
    
    const [recipe,setRecipe]=useState({
        name:"",
        explanation:"",
        ingredients:[],
        instructions:[],
        imageUrl:"",
        cookingTime:0,
        preparationTime:0,
        userOwner:userID
    });

   

    useEffect(()=>{

      console.log(recipe)
  
  
  
    },[recipe])
  

    const handleIngredientChange = (e,index)=>{
      const {value}=e.target
      const ingredients=recipe.ingredients;
      ingredients[index]=value;
      setRecipe({...recipe,ingredients});

    }

    const handleInstructionChange = (e,index)=>{
      const {value}=e.target
      const instructions=recipe.instructions;
      instructions[index]=value;
      setRecipe({...recipe,instructions});

    }

    const handleChange = (e)=>{
      const {name,value}=e.target
      setRecipe({...recipe,[name]:value});

    }

    const addIngredient=(e)=>{

      setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
    }

    const addInstruction=(e)=>{

      setRecipe({...recipe,instructions:[...recipe.instructions,""]})
    }

    const deleteIngredient=(index)=>{
      const tempIngredients = recipe.ingredients
      tempIngredients.splice(index, 1)
      setRecipe({...recipe, ingredients: tempIngredients});
    }

    const deleteInstruction=(index)=>{
      const tempInstructions = recipe.instructions
      tempInstructions.splice(index, 1)
      setRecipe({...recipe, instructions: tempInstructions});
    }

    const onSubmit = async (event)=>{

      event.preventDefault();
      try {
        await axios.post("https://recipeapi-7ex8.onrender.com/recipes",recipe,{headers:{authorization:cookies.access_token}});
        alert("Recipe created !")
        setRecipe({name:"",
        explanation:"",
        ingredients:[],
        instructions:[],
        imageUrl:"",
        cookingTime:0,
        preparationTime:0,
        userOwner:userID})
        
      } catch (err) {
        console.error(err)
        
      }
    }

  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>Create Recipe</h1>
        <form className='flex flex-col w-[25%] max-sm:w-[90%]' onSubmit={onSubmit}>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input type="text" id='name' name='name'  className='border px-1' value={recipe.name} onChange={handleChange} required/>
            <label htmlFor="explanation" className='font-semibold'>Explanation</label>
            <textarea name="explanation" id="explanation" cols="50" rows="5" className='border px-1' onChange={handleChange} value={recipe.explanation} required ></textarea>

            <label htmlFor="ingredients" className='font-semibold'>Ingredients</label>
            {recipe.ingredients.map((ingredient,index)=>(
              <div className='flex justify-between' key={index} >
                <input    
                  name='index'
                  className='border mb-2 px-1 w-full' 
                  type="text" 
                  value={ingredient}
                  onChange={(e)=>handleIngredientChange(e,index)} required/>

                  <BiMinus className='text-2xl cursor-pointer'  onClick={()=>deleteIngredient(index)}/>

              </div>  

                
            ))}

            <button onClick={addIngredient} className='border mt-2 bg-gray-50' type='button'>Add Ingredient</button>

            <label htmlFor="instructions" className='font-semibold'>Instructions</label>
            {recipe.instructions.map((instruction,index)=>(
              <div className='flex justify-between' key={index} >
                <input 
                  name='index'
                  className='border mb-2 px-1 w-full' 
                  type="text" 
                  value={instruction}
                  onChange={(e)=>handleInstructionChange(e,index)} required/>

                  <BiMinus className='text-2xl cursor-pointer' onClick={()=>deleteInstruction(index)}/>

                </div>
            ))}

            <button onClick={addInstruction} className='border mt-2 bg-gray-50' type='button'>Add Instruction</button>

            <label htmlFor="imageUrl" className='font-semibold'>Image URL</label>
            <input type="text" id='imageUrl' name='imageUrl' className='border px-1' value={recipe.imageUrl} onChange={handleChange} required/>
            <label htmlFor="cookingTime" className='font-semibold'>Cooking Time(minutes)</label>
            <input type="number" id='cookingTime' className='border px-1' name='cookingTime' value={recipe.cookingTime} onChange={handleChange} />
            <label htmlFor="preaparationTime" className='font-semibold'>Preparation Time(minutes)</label>
            <input type="number" id='preparationTime' className='border px-1' name='preparationTime' value={recipe.preparationTime} onChange={handleChange} />
            <button type='submit' className='bg-rose-400 border text-white py-1 rounded-lg mt-2 hover:bg-rose-500'>Submit</button>





        </form>





    </div>
  )
}

export default CreateRecipes