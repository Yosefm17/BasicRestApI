// Import necessary modules
const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies (JSON)

// Initialize the app
const app = express();
const PORT = 4000; // Define the port where the server will run

// Middleware to parse JSON request bodies
app.use(bodyParser.json()); // Parses incoming JSON requests and puts the data in req.body

// In-memory mock database for storing user data
// Note: In a real-world application, you would use a database like MongoDB, MySQL, or PostgreSQL
let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
];

// GET /users - Retrieve a list of all users
// Purpose: Fetch and return all user data stored in the system
app.get('/users', (req, res) => {
  res.status(200).json(users); // Send a 200 OK response with the list of users
});

// POST /users - Add a new user
// Purpose: Add a new user to the system
app.post('/users', (req, res) => {
  const { name, email } = req.body; // Destructure name and email from the request body

  // Validate input data
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  // Create a new user object with a unique ID
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1, // Increment ID based on the last user's ID
    name,
    email,
  };

  // Add the new user to the users array
  users.push(newUser);

  // Send a 201 Created response with the new user's data
  res.status(201).json(newUser);
});

// DELETE /users/:id - Delete a user by their unique ID
// Purpose: Remove a user from the system using their ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Parse the user ID from the request parameters

  // Find the index of the user with the given ID
  const userIndex = users.findIndex((user) => user.id === userId);

  // If user with the given ID doesn't exist, return a 404 Not Found response
  if (userIndex === -1) {
    return res.status(404).json({ message: `User with ID ${userId} not found.` });
  }

  // Remove the user from the array
  users.splice(userIndex, 1);

  // Send a 200 OK response confirming the deletion
  res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
});

// Start the server
// Purpose: Begin listening for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
