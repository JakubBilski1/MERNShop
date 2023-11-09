const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const AuthRoute = require('./routes/authRoute')
const ProductRoute = require('./routes/productRoute')
app.use(cors());
app.use(bodyParser.json());
console.log(process.env.DATABASE_URL)

app.use("/auth", AuthRoute )
app.use('/products', ProductRoute);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});