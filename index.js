const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const itemRoutes = require('./routes/item');
const warehouseRoutes = require('./routes/warehouse');

require('dotenv').config(); // Import dependancy that reads environment variables

const app = express();

// Read db credentials from environment variables
const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;

// Set default template engine to ejs and render path to 'views' folder
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // Parse body requests
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the public folder 

// Set the routes
app.use(itemRoutes);
app.use(warehouseRoutes);

// Connect to the mongo database
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PW}@cluster0.we5y7ah.mongodb.net/inventory?retryWrites=true&w=majority`
  )
  .then(() => {
    // If connection to db is successful, start the server
    app.listen(PORT, () => console.log('server started on port:', PORT));
  })
  .catch((err) => console.log(err));
