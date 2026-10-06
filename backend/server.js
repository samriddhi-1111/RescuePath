const express = require('express');
const cors = require('cors');
require('dotenv').config();

const algorithmRoutes = require('./routes/algorithmRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', algorithmRoutes);

app.get('/', (req, res) => {
  res.send('Disaster Rescue Path Planning API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
