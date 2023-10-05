import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {IoLogOutOutline} from 'react-icons/io5'
import {LuChefHat} from 'react-icons/lu'
import {IoReorderThreeOutline} from 'react-icons/io5'

const Navbar = () => {
    const [cookies,setCookies]=useCookies(["access_token"])
    const navigate=useNavigate();
    const [menuVisibility,setMenuVisibility]=useState(false)


    const logout = ()=>{

        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth")
        
    }

    const toggleMenu=()=>{

      setMenuVisibility(!menuVisibility);


    }

  return (
    <div className='flex justify-between bg-rose-500 text-white h-[5vh] max-sm:h-[7vh] items-center px-2'>
        <div className='text-2xl max-sm:text-xl cursor-pointer flex items-center' onClick={()=>{navigate("/")}}><LuChefHat className='text-3xl max-sm:text-2xl'/>Recipes Z</div>
        <div className={`flex sm:gap-5 max-sm:flex-col max-sm:absolute max-sm:bg-rose-500 top-[5vh] max-sm:transition-all  max-sm:z-10 max-sm:h-auto max-sm:rounded-bl-xl max-sm:gap-3 max-sm:pr-3 max-sm:py-5 max-sm:pl-10 max-sm:w-auto ${menuVisibility?"right-0":"-right-[100%]"}`}>
            {cookies.access_token && <div onClick={()=>navigate("/create-recipes")} className='cursor-pointer max-sm:text-right max-sm:text-lg'>Create Recipe</div>}
            {cookies.access_token && <div onClick={()=>navigate("/saved-recipes")} className='cursor-pointer max-sm:text-right max-sm:text-lg'>Saved Recipes</div>}
            {cookies.access_token?<div onClick={logout} className='cursor-pointer max-sm:flex max-sm:justify-end max-sm:items-center max-sm:gap-1'><IoLogOutOutline className='text-2xl'/><span className='sm:hidden max-sm:text-lg'>Logout</span></div>:<div onClick={()=>navigate("/auth")} className='cursor-pointer'>Login/Register</div>}
            
        </div>
        <IoReorderThreeOutline className='text-2xl sm:hidden cursor-pointer' onClick={toggleMenu}/>
    </div>
  )
}

export default Navbar