const dbConnect = require('./dbConnect');
const dashboardData = async(req, res) => {
    const db = await dbConnect();
    const collection = db.collection('Users');
    const query = { email: req.user.email };
    const userData = await collection.findOne(query);
    res.json(userData);
}
module.exports = dashboardData;