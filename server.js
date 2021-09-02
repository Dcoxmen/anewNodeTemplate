const express = require('express');
// Import and require mysql2

const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up static file server
app.use(express.static('public'));

// Use the router setup in the routes files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
