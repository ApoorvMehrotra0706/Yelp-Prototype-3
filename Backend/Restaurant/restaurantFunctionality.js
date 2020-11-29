/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const geocoder = require('google-geocoder');
const Login = require('../models/LoginModel');
const Restaurant = require('../models/RestaurantModel');
const Appetizer = require('../models/Appetizer');
const Beverage = require('../models/Beverages');
const MainCourse = require('../models/Main_Course');
const Salads = require('../models/Salads');
const Desserts = require('../models/Desserts');
const Review = require('../models/ReviewsModel');
const Orders = require('../models/OrdersModel');
const OrderCart = require('../models/OrdersCart');
const Country = require('../models/CountryModel');
const State = require('../models/StateModel');
const Cuisine = require('../models/CuisineModel');
const Gender = require('../models/GenderModel');

const geofinder = geocoder({
  key: 'AIzaSyDHRJvSWfXNenjs51fuPKCvOODQKm2AhQY',
});

const fetchStaticData = async (req) => {
  const res = {};
  const countryData = await Country.find();
  const stateData = await State.find();
  const cuisineData = await Cuisine.find();
  const genderData = await Gender.find();
  res.CountryName = countryData;
  res.StateName = stateData;
  res.CuisineName = cuisineData;
  res.GenderName = genderData;
  return res;
};

const restaurantSignup = async (req) => {
  const res = {};
  const restaurantData = await Login.findOne({ emailID: req.emailID, Role: 'Restaurant' });
  if (restaurantData) {
    res.Result = 'EmailID already in use';
  } else {
    res.Result = 'Restaurant signup successful';
    let place = req.streetAddress.concat(', ');
    place = place.concat(req.zip);
    /* eslint-disable-next-line func-names */
    geofinder.find(place, async function (error1, response) {
      const latitude = response[0].location.lat;
      const longitude = response[0].location.lng;
      const Password = await bcrypt.hash(req.Password, 10);
      const login = new Login({
        ...req,
        Password,
        Role: 'Restaurant',
      });
      const restaurantLogin = await login.save();
      const restaurant = new Restaurant({
        ...req,
        RestaurantID: restaurantLogin._id,
        Latitude: latitude,
        Longitude: longitude,
        TotalReviewCount: 0,
        TotalRatings: 0,
      });
      const restProfile = await restaurant.save();
    });
  }
  return res;
};

const restLogin = async (req) => {
  const res = {};
  // res.Result = 'Login successful';
  // eslint-disable-next-line consistent-return
  const loginResult = await Login.findOne({ emailID: req.emailID, Role: 'Restaurant' });
  if (loginResult) {
    if (await bcrypt.compare(req.password, loginResult.Password)) {
      res.Result = 'Login successful';
      res._id = loginResult._id;
      res.emailID = loginResult.emailID;
      res.Role = loginResult.Role;
    } else {
      res.Result = 'Invalid credentails';
    }
  } else {
    res.Result = 'ID not found';
  }
  return res;
};

const fetchRestaurantProfile = async (req) => {
  let res = null;
  const RestaurantID = req.id;
  res = await Restaurant.findOne({ RestaurantID });
  return res;
};

const insertFood = async (req) => {
  const res = {};
  if (req.category === 'APPETIZERS') {
    const appetizer = new Appetizer({
      ...req,
    });
    await appetizer.save();
    res.Result = 'FoodItem saved';
  } else if (req.category === 'BEVERAGES') {
    const beverages = new Beverage({
      ...req,
    });
    await beverages.save();
    res.Result = 'FoodItem saved';
  } else if (req.category === 'SALADS') {
    const salads = new Salads({
      ...req,
    });
    await salads.save();
    res.Result = 'FoodItem saved';
  } else if (req.category === 'DESSERTS') {
    const desserts = new Desserts({
      ...req,
    });
    await desserts.save();
    res.Result = 'FoodItem saved';
  } else if (req.category === 'MAIN_COURSE') {
    const mainCourse = new MainCourse({
      ...req,
    });
    await mainCourse.save();
    res.Result = 'FoodItem saved';
  }
  return res;
};

const updateFood = async (req) => {
  const res = {};
  if (req.category === 'APPETIZERS') {
    const appetizer = await Appetizer.updateOne({ _id: req.ID }, { ...req });
    res.Result = 'FoodItem updated';
  } else if (req.category === 'BEVERAGES') {
    const beverages = await Beverage.updateOne({ _id: req.ID }, { ...req });
    res.Result = 'FoodItem updated';
  } else if (req.category === 'SALADS') {
    const salads = await Salads.updateOne({ _id: req.ID }, { ...req });
    res.Result = 'FoodItem updated';
  } else if (req.category === 'DESSERTS') {
    const desserts = await Desserts.updateOne({ _id: req.ID }, { ...req });
    res.Result = 'FoodItem updated';
  } else if (req.category === 'MAIN_COURSE') {
    const mainCourse = await MainCourse.updateOne({ _id: req.ID }, { ...req });
    res.Result = 'FoodItem updated';
  }
  return res;
};

const deleteFood = async (req) => {
  const res = {};
  if (req.category === 'APPETIZERS') {
    const appetizer = await Appetizer.deleteOne({ _id: req.ID });
    res.Result = 'Item deleted';
  } else if (req.category === 'BEVERAGES') {
    const beverages = await Beverage.deleteOne({ _id: req.ID });
    res.Result = 'Item deleted';
  } else if (req.category === 'SALADS') {
    const salads = await Salads.deleteOne({ _id: req.ID });
    res.Result = 'Item deleted';
  } else if (req.category === 'DESSERTS') {
    const desserts = await Desserts.deleteOne({ _id: req.ID });
    res.Result = 'Item deleted';
  } else if (req.category === 'MAIN_COURSE') {
    const mainCourse = await MainCourse.deleteOne({ _id: req.ID });
    res.Result = 'Item deleted';
  }
  return res;
};

const updateRestProfile = async (req) => {
  const res = {};
  await Restaurant.updateOne({ RestaurantID: req.ID }, { ...req });
  res.Result = 'Updated Restaurant Profile';
  return res;
};

const updateOrder = async (req) => {
  const res = {};
  let status = null;
  let state = 'New';
  if (req.StatusID === '2') status = 'Preparing';
  else if (req.StatusID === '3') status = 'On the way';
  else if (req.StatusID === '4') status = 'Pick up Ready';
  else if (req.StatusID === '5') {
    status = 'Delivered';
    state = 'Delivered';
  } else if (req.StatusID === '6') {
    status = 'Picked up';
    state = 'Delivered';
  } else {
    status = 'Canceled';
    state = 'Canceled';
  }
  await Orders.updateOne({ _id: req._id }, { ...req, Status: status, State: state });
  res.Result = 'Updated Order Status';
  return res;
};

const restOrderSearchResults = async (req) => {
  const res = {};
  let orderDetails = [];
  if (req.sortOrder !== 'All') {
    orderDetails = await Orders.find({ RestaurantID: req.RestaurantID, State: req.sortOrder });
    res.OrderSearchList = orderDetails;
  } else {
    // eslint-disable-next-line no-unused-vars
    orderDetails = await Orders.find({ RestaurantID: req.RestaurantID });
    res.OrderSearchList = orderDetails;
  }
  return res;
};

module.exports = {
  restaurantSignup,
  restLogin,
  fetchRestaurantProfile,
  insertFood,
  updateFood,
  deleteFood,
  updateRestProfile,
  updateOrder,
  restOrderSearchResults,
  fetchStaticData,
};
