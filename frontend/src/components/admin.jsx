import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate= useNavigate();
    
    const [formData, setFormData] = useState({
         name: '',
         password: ''
    });
    const [totalProduct, setTotalProduct] = useState([]);
    const [component, setComponent] = useState(false);
     
    const [newFormData, setNewFormData]= useState({
            newName:'',
            newPassword:''
      })

    const [productData, setProductData] = useState({
              name: '',
              price:'',
              category:''
      });
  

  const handelAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/account/manage/admin', {
        name: formData.name,
        password: formData.password
      });
         console.log(response.data);
   
        showProducts();
        
  }
    catch (error) {
      console.error('Error during admin login:', error);
      alert('Admin login failed');
    }
}



const showProducts = async () => {
    try {
      console.log("on show products")
      const response = await axios.get('http://localhost:5000/api/products/dashboard');
      console.log(response.data)
      setComponent(false);
      setTotalProduct(response.data);
      console.log("Products fetched:", response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  const handelNewProduct = async () => {
    try {
      console.log("add new products")
      const variable= await axios.post('http://localhost:500/api/products/addNewProducts', productData)
    } catch (error) {
      console.log(error)
    }
  }

if(totalProduct.length > 0){
return (
    <div>
      <h1>Products</h1>
      <ul>
        {totalProduct.map(products => (
          <li key={products._id}>
            <h2>
              Name: {products.name} | 
              Price: {products.price} | 
              Category: {products.category}
            </h2>
            
           
          </li>                         
        ))}
      </ul>
      <form onSubmit={handelNewProduct}>
          <div>
            <label className="block mb-1">Product Name:</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => setProductData({...productData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Product Price</label>
            <input
              type="text" 
              value={productData.price}
              onChange={(e) => setProductData({...productData, price: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

           <div>
            <label className="block mb-1">Product Category</label>
            <input
              type="text" 
              value={productData.category}
              onChange={(e) => setProductData({...productData, category: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button 
          type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded"
          >AddOn</button>
          </form>
 </div>
    );
}

     return (
    <div>
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin page</h1>
        <form onSubmit={handelAdmin}>
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="text" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          
          </form>
          <button onClick={()=>
            navigate('/newAdmin')
          }>New Aadmin</button>
    </div>
    </div>
  )
  
}

export default Admin