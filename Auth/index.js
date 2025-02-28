const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth');

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); 
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the JWT Auth');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
