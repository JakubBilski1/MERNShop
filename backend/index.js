const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const initializeWebSocket = require('./websockets/cart_ws');
const { createServer } = require('http');
app.use(cookieParser());

const AuthRoute = require('./routes/authRoute');
const ProductRoute = require('./routes/productRoute');
const UserRoute = require('./routes/userRoute');
const DataRoute = require('./routes/dataRoute');
const initializeGuestCartWebSocket = require('./websockets/guest_cart_ws');

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

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

const server = createServer(app);

initializeWebSocket(server);
initializeGuestCartWebSocket(server);

server.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});