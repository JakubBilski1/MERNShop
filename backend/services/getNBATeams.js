const dbConnect = require('./dbConnect');

const getNBATeams = async (req, res) => {
    try{
        const db = await dbConnect();
        const collection = db.collection('NBATeams');
        const query = {};
        const teams = await collection.find(query).toArray();
        res.json(teams);
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = getNBATeams;