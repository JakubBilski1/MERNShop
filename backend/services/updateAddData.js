const dbConnect = require('./dbConnect');

const updateAddData = async (req, res) => {
    const db = await dbConnect();
    const collection = db.collection('Users');
    const query = { email: req.userData.email };
    const find = await collection.findOne(query);
    let cart, orders, favTeams;
    if(req.body.cart){
        cart = req.body.cart;
    }else{
        cart = find.cart;
    }
    if(req.body.ordersData){
        orders = req.body.orders;
    }else{
        orders = find.orders;
    }
    if(req.body.selectedTeams){
        favTeams = req.body.selectedTeams;
    }else{
        favTeams = find.favTeams;
    }
    const update = req.body.selectedTeams ? { $set: { favTeams: favTeams } } : { $push: { cart: cart } };
    const result = await collection.updateOne(query, update);
    res.json(result);
}

module.exports = updateAddData;