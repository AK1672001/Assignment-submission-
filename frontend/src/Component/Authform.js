import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ isLogin, role }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = role === 'admin' 
      ? `/api/admins/${isLogin ? 'login' : 'register'}` 
      : `/api/users/${isLogin ? 'login' : 'register'}`;
    try {
      const response = await axios.post(url, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Register'} as {role}</h2>
        <input 
          type="text" 
          name="username" 
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full mb-4 p-2 border rounded-lg" 
          placeholder="Username" 
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded-lg" 
          placeholder="Password" 
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          {isLogin ? 'Login' : 'Register'}
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
