const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config(); 
const AuthRoute = require('./routes/authRoute')
const ProductRoute = require('./routes/productRoute');
const UserRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", AuthRoute )
app.use('/products', ProductRoute);
app.use('/u/', UserRoute)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});