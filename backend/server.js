const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv for environment variables

// Import routes
const predictRoute = require('./routes/predict.js');
const authRoute = require('./routes/auth.js');

// Load environment variables
dotenv.config(); // Load variables from .env file

// Create the Express app
const app = express();

// Middleware
// app.use(cors());  // Enable CORS
app.use(cors());

app.use(bodyParser.json());  // Parse incoming JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/predict', predictRoute);  // Mount the prediction route at /api/predict
app.use('/api/auth', authRoute);  // Mount the auth routes at /api/auth

// Start the server on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});





// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// // Import routes
// const predictRoute = require('./routes/predict.js');
// const authRoute = require('./routes/auth.js');

// // Create the Express app
// const app = express();

// // Middleware
// app.use(cors());  // Enable CORS
// app.use(bodyParser.json());  // Parse incoming JSON data

// // Routes
// app.use('/api/predict', predictRoute);  // Mount the prediction route at /api/predict
// app.use('/api/auth', authRoute);  // Mount the auth routes at /api/auth

// // Start the server on port 5000
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Backend server is running on http://localhost:${port}`);
// });











// // Import dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const axios = require('axios');

// // Create Express app
// const app = express();

// // Middleware
// app.use(express.json()); // To parse JSON request bodies
// app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));  // Authentication routes
// app.use('/api/predict', require('./routes/predict'));  // Prediction route


// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
