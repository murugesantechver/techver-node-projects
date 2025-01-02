// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nextcloudRoutes = require('./routes/nextCloudRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/nextcloud', nextcloudRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
