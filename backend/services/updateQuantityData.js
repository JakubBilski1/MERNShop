const dbConnect = require('./dbConnect');

const roundToTwoDecimals = (number) => {
    return Math.round(number * 100) / 100;
};

const updateQuantityData = async (req, res) => {
    try{
        const db = await dbConnect();
        const collection = db.collection('Users');
        const query = { email: req.userData.email };
        const newQuantity = parseInt(req.body.quantity)
        const productId = req.body.id
        const price = parseFloat(req.body.fullPrice)
        const priceToSend = roundToTwoDecimals(newQuantity*price)
        const updateQuantity = await collection.updateOne(query, { $set: { "cart.$[elem].quantity": newQuantity } }, { arrayFilters: [{ "elem.cartProductId": productId }] });
        const updateFullPrice = await collection.updateOne(query, { $set: { "cart.$[elem].fullPrice": priceToSend } }, { arrayFilters: [{ "elem.cartProductId": productId }] });
        res.json({updateQuantity, updateFullPrice});
    }catch(err){
        console.log(err);
    }
}

module.exports = updateQuantityData;