import { useState } from 'react';
import axios from 'axios';

const NewAdmin= () => {
    
    const [newFormData, setNewFormData]= useState({
            newName:'',
            newPassword:''
      })

    const addNewAdmin = async () => {
    try {
      console.log("adding new admin")
      const response = await axios.post('http://localhost:5000/api/account/manage/newAdmin', {
        name: newFormData.newName,
        password: newFormData.newPassword
      });
      console.log('New admin response:', response.data);
      
      showProducts();
      
    } catch (error) {
      console.error('Error adding new admin:', error);
      alert('Failed to add new admin');
    }
  }
  const showProducts = async () => {
      try {
        console.log("on show products")
        const response = await axios.get('http://localhost:5000/api/products/dashboard');
        console.log(response.data)
        console.log("Products fetched:", response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    return (
      <div>
        <h1>New Admin Page</h1>
        <div>
      <div className="container mx-auto p-4 max-w-md">
        <form onSubmit={addNewAdmin}>
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={newFormData.name}
              onChange={(e) => setNewFormData({...newFormData, newName: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="text" 
              value={newFormData.password}
              onChange={(e) => setNewFormData({...newFormData, newPassword: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded"
         >
            Add Admin
          </button>
         
          </form>
    </div>
    </div>
       </div>
    );
  }


export default NewAdmin;