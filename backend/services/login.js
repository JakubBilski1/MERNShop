const argon2 = require('argon2');
const dbConnect = require('./dbConnect');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const db = await dbConnect()
    const { email, password } = req.body.data;
    const collection = db.collection('Users');
    const query = { email: email };
    const user = await collection.findOne(query);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const isPasswordCorrect = await argon2.verify(user.password, password);
      if (!isPasswordCorrect) {
        res.status(401).json({ error: 'Incorrect password' });
      } else {
        const userData = {
          id: user._id,
          email
        }
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        return res.json({ message: 'Logged in', redirectTo: '/u/dashboard' });
      }
    }
}

module.exports = login;