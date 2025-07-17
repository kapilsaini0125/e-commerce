
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Dashboard({ products, currentUser, setCurrentUser}) {


  const [kartProduct, setKartProduct] = useState([]);
  const [details, setDetails] = useState(false);
  const [count, setCount] = useState(1);

  const [productDetails, setProdutDetails] = useState(() => {
    const a= localStorage.getItem('productDetails');
    return a != null ? JSON.parse(a) : null
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Kart Product: ",kartProduct);
  }, [kartProduct, details]);

  const addKart = async (product) => {
    try {
      console.log(count)
      console.log(product);
      
      const response = await axios.post(
        'http://localhost:5000/api/addToKart', {
          id: product,
          productUser: currentUser,
          product,
          count
        }
        
      );  
      console.log('Product added to kart:', response.data);
    } catch (error) {
      console.error('Error adding product to kart:', error);
    }
  }

  const showKart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Showkart',
        {
          params:{ productUser: currentUser}}
      );
     
      setKartProduct(response.data)
      console.log("responce.data:", kartProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  const showDetails = async (id) => {
    console.log( id);
    try {
      const response = await axios.get('http://localhost:5000/api/products/details',
        {
          params:{ currentProduct: id}
        }
      );
      localStorage.setItem('productDetails', JSON.stringify(response.data));
      setProdutDetails(response.data);
      setDetails(true);
      console.log("Product details:", response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }

  const updateKart = async (id) => {
    try {
      console.log(id);
       await axios.delete(`http://localhost:5000/api/deleteKart/${id}` );
      
       setKartProduct(kartProduct.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error removing product from kart:', error);
    }
  }

  if(details){
    return (
      <div>
     
     <h1>name: {productDetails.name} | price: {productDetails.price} | category: {productDetails.category}</h1>
             <button onClick={() => {
              addKart(productDetails._id)
             }
          }>
           Buy
          </button>
      </div>
    )
      
  }

  if (kartProduct.length > 0) {
  return (
    <div>
      <h1>Products in Kart</h1>
      <ul>
        {kartProduct.map(products => (
          <li key={products._id}>
            <h2>
              Name: {products.product.name} | 
              Price: {products.product.price} | 
              Category: {products.product.category}
            </h2>
            <button onClick={() => {
             setCount(count - 1);
             updateKart(products._id)   
            }
            }
            
            >Remove</button>
          </li>                         
        ))}
      </ul>
       
      </div>
    );

  }
  
  

  return (
    <div >
      <h1 >Product Dashboard</h1>
      <ul >
        {products.map(product => (
          <li key={product._id} >
            <button onClick={() => {
             showDetails(product._id); 
            }}>
            <h2>{product.name} </h2>
            </button>
            <button onClick={() => {
              setCount(count + 1);
              addKart(product)
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
              Log out
              </button>
    </div>  
  );}

export default Dashboard


/*<ul >
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
      </ul>*/