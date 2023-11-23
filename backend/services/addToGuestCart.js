const dbConnect = require('./dbConnect');
const addToGuestCart = async (product, sessionId) => {
    const db = await dbConnect();
    const cartCol = db.collection('CartForGuests');
    const query = { userId: sessionId };
    const cart = await cartCol.findOne(query);
    if(!cart){
        const cartData = {
            userId: sessionId,
            cart: [product]
        }
        const result = await cartCol.insertOne(cartData);
        return result;
    }else{
        const update = { $push: { cart: product } };
        const result = await cartCol.updateOne(query, update);
        return result;
    }
}

module.exports = addToGuestCart;