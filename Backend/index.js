/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { mongoDB, frontendURL } = require('./config');

const schema = require('./schema/schema');
// const schema = require('./GraphqlSchema/schema')

// const restaurantRoutes = require('./routes/restRoutes');

// const customerRoutes = require('./routes/custRoutes');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_YELP,
    resave: false,
    saveUninitialized: true,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

// eslint-disable-next-line func-names
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB connection failed');
  } else {
    console.log('MongoDB connected');
  }
});

// app.use('/restaurant', restaurantRoutes);

// app.use('/customer', customerRoutes);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3004, () => {
  console.log('GraphQL server started on port 3004');
});
