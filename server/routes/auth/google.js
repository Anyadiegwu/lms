const { Router } = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

let users = [];

router.post('/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = users.find(u => u.googleId === googleId);

    if (!user) {
      user = { googleId, email, name, picture };
      users.push(user);
    }

    const jwtToken = jwt.sign(
      { userId: googleId },             
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );


    res.json({
      success: true,
      token: jwtToken,
      user: { name, email, picture },
    });

  } catch (error) {
    console.error('❌ Google token verification failed:', error.message);
    res.status(401).json({ success: false, message: 'Invalid Google token' });
  }
});

module.exports = router;