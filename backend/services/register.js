const argon2 = require('argon2');
const dbConnect = require('./dbConnect');

const register = async (req, res) => {
    console.log(req.sessionID)
    let result, guestCart
    const cartToSend = []
    const db = await dbConnect();
    const password = await argon2.hash(req.body.data.password);
    const { email, nick } = req.body.data;
    const collection = db.collection('Users');
    const guestCol = db.collection('CartForGuests');
    /*const guestQuery = {userId: sessionId};
    const guestArr = await guestCol.find(guestQuery).toArray();
    if(guestArr.length !== 0){
      guestCart = guestArr[0].cart
      guestCart.forEach((item) => {
        cartToSend.push(item)
      })
    }
    const query = { email: email };
    const user = await collection.findOne(query);
    if (user) {
      res.status(409).json({ error: 'User already exists' });
    } else {
      if(guestArr.length === 0){
        await collection.insertOne({ email, password, nick, settings: {darkTheme: true, country: '', city: '', phoneNumber: '', birthDate: ''}, profileImage: '', cart: [], orders: [], role: 'user', createdAt: new Date(), favTeams: [] })
      }else{
        await collection.insertOne({ email, password, nick, settings: {darkTheme: true, country: '', city: '', phoneNumber: '', birthDate: ''}, profileImage: '', cart: cartToSend, orders: [], role: 'user', createdAt: new Date(), favTeams: [] });
      }
      const userData = {
        id: result.insertedId,
        email,
        password,
        nick
      }

      res.json({ userData, redirectTo: '/login' });
    }*/
}

module.exports = register;