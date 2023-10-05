import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Auth from './pages/Auth';
import SavedRecipes from './pages/SavedRecipes';
import Navbar from './components/Navbar';
import CreateRecipes from './pages/CreateRecipes';
import Recipe from './pages/Recipe';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/saved-recipes' element={<SavedRecipes/>}/>
          <Route path='/create-recipes' element={<CreateRecipes/>}/>
          <Route path='/recipe/:recipeID' element={<Recipe/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
