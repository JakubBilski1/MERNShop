const dbConnect = require('./dbConnect');

const deleteFromGuestCart = async (sessionId, id, size) => {
    try{
        const db = await dbConnect();
        const cartCol = db.collection('CartForGuests');
        const query = { userId: sessionId };
        const markedForDeletion = `${id}_${size}`;

        const result = await cartCol.updateOne(query, { $pull: { cart: { cartProductId: markedForDeletion } } });

        return result
    }catch(err){
        console.log(err)
    }
}

module.exports = deleteFromGuestCart;