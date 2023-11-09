const argon2 = require('argon2');
const dbConnect = require('./dbConnect');

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
          email,
          nick: user.nick
        }
        return res.json({ userData });
      }
    }
}

module.exports = login;