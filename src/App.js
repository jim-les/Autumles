import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    // Implement your login logic here

    // Example using fetch:
    try {
      const response = await fetch('http:localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check for successful login
      if (response.ok) {
        setLoggedIn(true);
        console.log('Login successful!');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here

    // Example using fetch:
    fetch('http:localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Check for successful logout
        if (data.success) {
          setLoggedIn(false);
          console.log('Logout successful!');
        } else {
          console.error('Logout failed:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="container mt-5">
      {isLoggedIn ? (
        <div>
          <p>Welcome! You are logged in.</p>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <label>Email:</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="text"
            className="form-control"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
