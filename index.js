const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory user data (replace this with a database in a real-world scenario)
const users = [
  { id: 1, email: 'user@example.com', password: 'password123' },
  // Add more user data as needed
];

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the in-memory data
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Return a success message or token in a real-world scenario
    res.json({ success: true, message: 'Login successful' });
    console.log("login successful")
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    console.log("login failed")

  }
});

// API endpoint for logout (in a real-world scenario, you might invalidate a token)
app.post('/api/logout', (req, res) => {
  // Perform logout actions as needed
  res.json({ success: true, message: 'Logout successful' });
});

// Serve the static React app (assuming it's built and located in the "build" directory)
app.use(express.static('build'));

// Handle any other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
