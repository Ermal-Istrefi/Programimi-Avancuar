const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const supplierRoutes = require('./routes/supplierRoutes');
const supplyRoutes = require('./routes/supplyRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const movementRoutes = require('./routes/movementRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reportRoutes = require('./routes/reportRoutes');
const productInOrderRoutes = require ('./routes/productsInOrderRoutes');
const productsInSupplyRoutes = require('./routes/productsInSupplyRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use('/suppliers', supplierRoutes);
app.use('/supplies', supplyRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/purchase-orders', purchaseOrderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/movements', movementRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/reports', reportRoutes);
app.use('/productInOrder', productInOrderRoutes);
app.use('/productsInSupply', productsInSupplyRoutes);


// MongoDB connection URI
const PORT = process.env.PORT || 5003;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ermalistrefi:as388AaK8cDfwvnf@cluster0.ue5cylh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Connected Successfully');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
