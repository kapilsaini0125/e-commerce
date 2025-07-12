
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
function Dashboard({ products, setCurrentUser}) {
const navigate = useNavigate();

  
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    category: ''
  });

  const addKart = async () => {
    try {
      console.log( currentProduct);
      
      const response = await axios.get(
        'http://localhost:5000/api/addToKart',
        
      );  console.log('Product added to kart:', response.data);
    } catch (error) {
      console.error('Error adding product to kart:', error);
    }
  }

  return (
    <div >
      <h1 >Product Dashboard</h1>
      <ul >
        {products.map(product => (
          <li key={product._id} >
            <h2>Name: {product.name} | Price: {product.price} | Category: {product.category}</h2>
            
            <button onClick={() => {
              setCurrentProduct(product.id);
              addKart()
             }
          }>
              Buy
              </button>
            </li>
        ))}
      </ul>
       <button>Kart</button>
       <button  onClick= {() => 
             { 
              localStorage.removeItem('currentUser');
              navigate('/signup')
              setCurrentUser(null);
              
             }
            }
            
            >Exit</button>

    </div>  
    
  );

  }
export default Dashboard
