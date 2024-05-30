const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



// Import routes
const supplierRoutes = require('./routes/supplierRoutes');
const supplyRoutes = require('./routes/supplyRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const locationRoutes = require('./routes/locationRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const movementRoutes = require('./routes/movementRoutes');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Use routes
app.use('/suppliers', supplierRoutes);
app.use('/supplies', supplyRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/locations', locationRoutes);
app.use('/purchase-orders', purchaseOrderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/movements', movementRoutes);



// Load environment variables from .env file
const PORT = process.env.PORT || 5003;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection URI
const uri = "mongodb://localhost:27017/SupplyFlow";
mongoose.connect(uri, {});

// Once MongoDB connection is open, log a success message
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
