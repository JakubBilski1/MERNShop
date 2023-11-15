const dbConnect = require('./dbConnect');

const roundToTwoDecimals = (number) => {
    return Math.round(number * 100) / 100;
};

const getCart = async(email)=>{
    try{
        const db = await dbConnect();
        const collectionUsers = db.collection('Users');
        const collectionProducts = db.collection('Products');
        const query = { email: email };
        const userData = await collectionUsers.findOne(query);
        const userCart = userData.cart;
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

module.exports = getCart;