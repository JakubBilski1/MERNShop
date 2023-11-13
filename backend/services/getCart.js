const dbConnect = require('./dbConnect');

const getCart = async(req, res)=>{
    const db = await dbConnect();
    const collectionUsers = db.collection('Users');
    const collectionProducts = db.collection('Products');
    const query = { email: req.userData.email };
    const userData = await collectionUsers.findOne(query);
    const productsQuery = { id: { $in: userData.cart.map(element => element.id) } };
    const products = await collectionProducts.find(productsQuery).toArray();
    products.forEach(product => {
        product.size = userData.cart.find(element => element.id === product.id).size;
    });
    res.json(products)
}

module.exports = getCart;