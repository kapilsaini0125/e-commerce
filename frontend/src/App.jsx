import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Login from './components/login';



function App(){
 const [currentUser, setCurrentUser] = useState(() => {
  const res= localStorage.getItem('currentUser');
  return res!= null? JSON.parse(res): null
 });
 const [products, setProducts] = useState([])
 
 const initilizeProducts = async () => {
      try {
        console.log("Initializing products...");
        const  product = await axios.get('http://localhost:5000/api/products/dashBoard');
         setProducts(product.data)
        
      } catch (error) {
        console.error(error);
      }
    };


   useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if(currentUser){
      console.log("Current user found.");  
      initilizeProducts();
    }
  }, [currentUser]);



  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser? <Navigate to="/dashboard" />: <Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/dashboard" element={<Dashboard  products={products} currentUser= {currentUser} setCurrentUser={setCurrentUser}/>} />
       </Routes>
          </BrowserRouter>
       
    </>
  )
}

export default App
