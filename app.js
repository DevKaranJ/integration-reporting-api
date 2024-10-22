const express = require('express');
require('dotenv').config();
const dataProcessingRoutes = require('./routes/dataProcessing');
const reportingRoutes = require('./routes/reporting');
const alertRoutes = require('./routes/alerts');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());

app.use('/api/data', dataProcessingRoutes);
app.use('/api/reports', reportingRoutes);
app.use('/api/alerts', alertRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
