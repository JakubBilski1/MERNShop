const dbConnect = require('./dbConnect');
const roundToTwoDecimals = require('./roundToTwoDecimals')

const updateQuantityDataGuest = async (sessionId, id, quantity, inpPrice) => {
    try{
        const db = await dbConnect();
        const cartCol = db.collection('CartForGuests');
        const query = { userId: sessionId };
        const newQuantity = parseInt(quantity)
        const productId = id
        const price = parseFloat(inpPrice)
        const priceToSend = roundToTwoDecimals(newQuantity*price)
        const updateQuantity = await cartCol.updateOne(query, { $set: { "cart.$[elem].quantity": newQuantity } }, { arrayFilters: [{ "elem.cartProductId": productId }] });
        const updateFullPrice = await cartCol.updateOne(query, { $set: { "cart.$[elem].fullPrice": priceToSend } }, { arrayFilters: [{ "elem.cartProductId": productId }] });
        return {updateQuantity, updateFullPrice}
    }catch(err){
        console.log(err);
    }
} 

module.exports = updateQuantityDataGuest;