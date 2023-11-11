const argon2 = require('argon2');
const dbConnect = require('./dbConnect');

const register = async (req, res) => {
    const db = await dbConnect();
    const password = await argon2.hash(req.body.data.password);
    const { email, nick } = req.body.data;
    const collection = db.collection('Users');
    const query = { email: email };
    const user = await collection.findOne(query);
    if (user) {
      res.status(409).json({ error: 'User already exists' });
    } else {
      const result = await collection.insertOne({ email, password, nick, settings: {darkTheme: true, country: '', city: '', phoneNumber: '', birthDate: ''}, profileImage: '', cart: [], orders: [], role: 'user', createdAt: new Date(), favTeams: [] });
      console.log(result);
      const userData = {
        id: result.insertedId,
        email,
        password,
        nick
      }
      res.json({ userData, redirectTo: '/login' });
    }
}

module.exports = register;