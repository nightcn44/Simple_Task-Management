const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors());

readdirSync('./routes').map((i) => {
  try {
    console.log(`Loading route: ${i}`);
    app.use('/api', require('./routes/' + i));
  } catch (err) {
    console.error(`Error loading route ${i}:`, err);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});