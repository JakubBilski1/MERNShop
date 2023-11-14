const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cookieParser());

const AuthRoute = require('./routes/authRoute');
const ProductRoute = require('./routes/productRoute');
const UserRoute = require('./routes/userRoute');
const DataRoute = require('./routes/dataRoute');
const CartRoute = require('./routes/cartRoute');

const port = 5000;

let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/auth", AuthRoute);
app.use('/products', ProductRoute);
app.use('/u', UserRoute);
app.use('/d/', DataRoute)
app.use('/c/', CartRoute)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});