const dbConnect = require('./dbConnect');
const roundToTwoDecimals = require('./roundToTwoDecimals');

const getGuestCart = async (sessionId) => {
    try{
        if(!sessionId){
            return
        }
        const idStr = sessionId.toString()
        const db = await dbConnect();
        const cartCol = db.collection('CartForGuests');
        const collectionProducts = db.collection('Products');
        const query = { userId: idStr };
        const userData = await cartCol.findOne(query);
        const userCart = userData ? userData.cart : null
        if(!userCart){
            return []
        }
        const products = [];
        let totalPrice = 0;
        for(let i = 0; i < userCart.length; i++){
            const product = await collectionProducts.findOne({id: userCart[i].id});
            if(!product){
                continue;
            }
            product.size = userCart[i].size;
            product.quantity = userCart[i].quantity;
            product.fullPrice = roundToTwoDecimals(product.price*product.quantity);
            product.maxQuantity = product.sizes[product.size];
            totalPrice += product.fullPrice;
            products.push(product);
        }
        formattedTotalPrice = roundToTwoDecimals(totalPrice);
        return {products, formattedTotalPrice}
    }catch(err){
        console.log(err)
    }
}

module.exports = getGuestCart;