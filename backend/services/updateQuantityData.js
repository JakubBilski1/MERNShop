const dbConnect = require('./dbConnect');

const roundToTwoDecimals = (number) => {
    return Math.round(number * 100) / 100;
};

const updateQuantityData = async (email, id, quantity, inpPrice) => {
    try{
        const db = await dbConnect();
        const collection = db.collection('Users');
        const query = { email: email };
        const newQuantity = parseInt(quantity)
        const productId = id
        const price = parseFloat(inpPrice)
        const priceToSend = roundToTwoDecimals(newQuantity*price)
        const updateQuantity = await collection.updateOne(query, { $set: { "cart.$[elem].quantity": newQuantity } }, { arrayFilters: [{ "elem.cartProductId": productId }] });
        const updateFullPrice = await collection.updateOne(query, { $set: { "cart.$[elem].fullPrice": priceToSend } }, { arrayFilters: [{ "elem.cartProductId": productId }] });
        return {updateQuantity, updateFullPrice}
    }catch(err){
        console.log(err);
    }
}

module.exports = updateQuantityData;