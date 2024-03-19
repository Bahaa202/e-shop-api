const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const wishlistsRoutes = require('./routes/wishlists');
const cartsRoutes = require('./routes/carts');
const stripeRoute = require("./routes/stripe");
const brandsRoute = require("./routes/brands");
const userAddressesRoute = require("./routes/userAddresses");

const api = process.env.API_URL;


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/wishlists`, wishlistsRoutes);
app.use(`${api}/carts`, cartsRoutes);
app.use(`${api}/checkout`, stripeRoute);
app.use(`${api}/brands`, brandsRoute);
app.use(`${api}/userAddresses`, userAddressesRoute);

//Database
const DB = process.env.MONGODB_URL;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(8080, ()=>{

    console.log('server is running http://localhost:8080');
})