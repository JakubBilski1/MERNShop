const dbConnect = require('./dbConnect');

const removeFromCart = async (email, id, size) => {
    try{
        const db = await dbConnect();
        const collection = db.collection('Users');
        const query = { email: email };
        const markedForDeletion = `${id}_${size}`;

        const result = await collection.updateOne(query, { $pull: { cart: { cartProductId: markedForDeletion } } });

        return result
    }catch(err){
        console.log(err)
    }
}

module.exports = removeFromCart;
