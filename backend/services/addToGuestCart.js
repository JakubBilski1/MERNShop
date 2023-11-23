const dbConnect = require('./dbConnect');

const addToGuestCart = async (product, sessionId) => {
    try{
        const db = await dbConnect();
        const cartCol = db.collection('CartForGuests');
        const query = { userId: sessionId };
        const cart = await cartCol.findOne(query);
        let isItemInCart = false;
        if(!cart){
            const cartData = {
                userId: sessionId,
                cart: [product],
                expiresAfter: new Date(Date.now() + 60 * 1000).toLocaleString()
            }
            const result = await cartCol.insertOne(cartData);
            return result;
        }else{
            if (product.id && product.size) {
                cart.cart.forEach((item) => {
                    if (item.id == product.id && item.size == product.size) {
                        isItemInCart = true;
                    }
                });
                if (isItemInCart) {
                    return 'This item is already in your cart';
                } else {
                    const update = { $push: { cart: product }, $set: { expireAt: new Date(Date.now() + 60 * 1000) } };
                    const result = await cartCol.updateOne(query, update);
                    return result;
                }
            } else {
                return 'Set cart';
            }
        }
    }catch(err){
        console.log(err)
    }
    
}

module.exports = addToGuestCart;