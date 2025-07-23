import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Signup({ setCurrentUser }) {
  const navigate= useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  
  const addKart = async (new_id) => {
    try {
      console.log("Adding from signup", new_id);
      const response = await axios.post(
        'http://localhost:5000/api/addToKart', 
          
           {new_id}
         
        
        
      );  
      console.log('Product added to kart:', response.data);
    } catch (error) {
      console.error('Error adding product to kart:', error);
    }
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      console.log("on signup");
      const signUp = await axios.post('http://localhost:5000/api/account/signup', formData);
      const new_id = signUp.data.id;
      localStorage.setItem('currentUser', JSON.stringify(new_id))
      setCurrentUser(new_id);
      addKart(new_id);
      navigate('/dashboard');
           
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <button onClick={() =>{
        navigate('/admin');
      }}>
        Admin
      </button>
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Signup page</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
          >
            Sign Up
          </button>
        </form>
        <button
            onClick= {() => 
             { 
              navigate('/login');
            }}
            >Have An Account</button>
      </div>
        
    
    </div>
  );
}

export default Signup;