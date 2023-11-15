const dbConnect = require('./dbConnect');

const getSettingsData = async (email) => {
    const db = await dbConnect();
    const collection = db.collection('Users');
    const query = { email: email}
    const userData = await collection.findOne(query)
    const result = userData.settings
    return result
}

module.exports = getSettingsData;