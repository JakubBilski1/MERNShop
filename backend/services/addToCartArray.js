const dbConnect = require('./dbConnect');

const addToCartArray = async (email, cartData) => {
    const db = await dbConnect();
    const collection = db.collection('Users');
    const query = { email: email };
    const user = await collection.findOne(query);
    
    let isItemInCart = false;

    if (cartData.id && cartData.size) {
        user.cart.forEach((item) => {
            if (item.id == cartData.id && item.size == cartData.size) {
                isItemInCart = true;
            }
        });
        if (isItemInCart) {
            return 'This item is already in your cart';
        } else {
            const update = { $push: { cart: cartData } };
            const result = await collection.updateOne(query, update);
            return result;
        }
    } else {
        console.log('ustaw koszyk');
    }
}

module.exports = addToCartArray;
