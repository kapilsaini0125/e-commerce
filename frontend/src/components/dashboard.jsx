
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Dashboard({ products, currentUser, setCurrentUser}) {

  const [kartProduct, setKartProduct] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
  }, [kartProduct]);

  const addKart = async (product) => {
    try {
      console.log(product);
      
      const response = await axios.post(
        'http://localhost:5000/api/addToKart', {
          id: product,
          productUser: currentUser
        }
        
      );  
      console.log('Product added to kart:', response.data);
    } catch (error) {
      console.error('Error adding product to kart:', error);
    }
  }

  const showKart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos/account/kart',
        {
          params:{ productUser: currentUser}}
      );
     
      setKartProduct(response.data)
    
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


  if(kartProduct.length > 0) {
    return (
      <div>
        <h1>Products in Kart</h1>
        <ul>
          {kartProduct.map(product => (
            <li key={product._id}>
              <h2>Name: {product.name} | Price: {product.price} | Category: {product.category}</h2>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setKartProduct([]);

          }}>
          Order Now
        </button>
      </div>
    );

  }
  
  if(kartProduct.length === 0) {
    return(
      <div>
        <h1>No products in Kart</h1>
        
      </div>
    )
  }

  return (
    <div >
      <h1 >Product Dashboard</h1>
      <ul >
        {products.map(product => (
          <li key={product._id} >
            <h2>Name: {product.name} | Price: {product.price} | Category: {product.category}</h2>
            <button onClick={() => {
              addKart(product._id)
             }
          }>
           Buy
          </button>
          </li>
        ))}
      </ul>
       
       <button 
       onClick= {showKart}>
        Kart
      </button>
       
       <button  onClick= {() => 
             { 
              localStorage.removeItem('currentUser');
              navigate('/signup')
              setCurrentUser(null);
             }
            }>
              Exit
              </button>
    </div>  
  );}

export default Dashboard
