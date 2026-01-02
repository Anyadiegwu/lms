require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(express.json());


const googleAuthRoute = require('./routes/auth/google');
const emailAuthRoute = require('./routes/auth/auth');

app.use('/api/auth', googleAuthRoute);                
app.use('/api/auth', emailAuthRoute);                    

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is alive and routes are mounted!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});