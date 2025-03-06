import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setMessage('Login successful!');
      setIsAuthenticated(true);  // Set authentication state
    } else {
      setMessage('Invalid username or password');
    }
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const inputStyle = {
    marginBottom: '15px', // Add space between input fields
    width: '100%', // Make inputs full width
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle} // Apply input styles
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle} // Apply input styles
            />
          </label>
        </div>
        <button 
          type="submit" 
          style={buttonStyle} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} 
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <ProductList /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="add" element={isAuthenticated ? <AddProduct /> : <Navigate to="/" />} />
        <Route path="edit/:id" element={isAuthenticated ? <EditProduct /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;