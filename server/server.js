require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://lms-silk-phi.vercel.app', 
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

// const PORT = process.env.PORT || 5000;
app.listen( () => {
  console.log(`🚀 Backend running on https://lms-4nir.onrender.com`);
});