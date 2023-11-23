const dbConnect = require('./dbConnect');
const getGuestCart = async (sessionId) => {
    try{
        if(!sessionId){
            return
        }
        const idStr = sessionId.toString()
        const db = await dbConnect();
        const cartCol = db.collection('CartForGuests');
        const query = { userId: idStr };
        const userCart = await cartCol.findOne(query);
        const cart = userCart ? userCart.cart : null
        if(!cart){
            return []
        }
        return cart;
    }catch(err){
        console.log(err)
    }
}

module.exports = getGuestCart;