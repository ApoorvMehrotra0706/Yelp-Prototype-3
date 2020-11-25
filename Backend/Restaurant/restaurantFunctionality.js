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

const geofinder = geocoder({
  key: 'AIzaSyDHRJvSWfXNenjs51fuPKCvOODQKm2AhQY',
});

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

const fetchRestaurantProfile = async (req) => {
  let res = null;
  const RestaurantID = req.id;
  const restProfile = await Restaurant.findOne({ RestaurantID }, (err, result) => {
    if (result) res = result;
  });
  return res;
};

const insertFood = async (req) => {
  const res = {};
  if (req.category === 'APPETIZERS') {
    const appetizer = new Appetizer({
      ...req,
    });
    await appetizer.save();
    res.result = 'Appetizer saved';
  } else if (req.category === 'BEVERAGES') {
    const beverages = new Beverage({
      ...req,
    });
    await beverages.save();
    res.result = 'Beverage saved';
  } else if (req.category === 'SALADS') {
    const salads = new Salads({
      ...req,
    });
    await salads.save();
    res.result = 'Salad saved';
  } else if (req.category === 'DESSERTS') {
    const desserts = new Desserts({
      ...req,
    });
    await desserts.save();
    res.result = 'Desserts saved';
  } else if (req.category === 'MAIN_COURSE') {
    const mainCourse = new MainCourse({
      ...req,
    });
    await mainCourse.save();
    res.Result = 'MainCourse saved';
  }
  return res;
};

const updateFood = async (req) => {
  const res = {};
  if (req.category === 'APPETIZERS') {
    const appetizer = await Appetizer.updateOne({ _id: req.ID }, { ...req });
    res.result = 'Appetizer updated';
  } else if (req.category === 'BEVERAGES') {
    const beverages = await Beverage.updateOne({ _id: req.ID }, { ...req });
    res.result = 'Beverage updated';
  } else if (req.category === 'SALADS') {
    const salads = await Salads.updateOne({ _id: req.ID }, { ...req });
    res.result = 'Salad updated';
  } else if (req.category === 'DESSERTS') {
    const desserts = await Desserts.updateOne({ _id: req.ID }, { ...req });
    res.result = 'Desserts updated';
  } else if (req.category === 'MAIN_COURSE') {
    const mainCourse = await MainCourse.updateOne({ _id: req.ID }, { ...req });
    res.Result = 'MainCourse updated';
  }
  return res;
};

const deleteFood = async (req) => {
  const res = {};
  if (req.category === 'APPETIZERS') {
    const appetizer = await Appetizer.deleteOne({ _id: req.ID });
    res.result = 'Appetizer item deleted';
  } else if (req.category === 'BEVERAGES') {
    const beverages = await Beverage.deleteOne({ _id: req.ID });
    res.result = 'Beverage item deleted';
  } else if (req.category === 'SALADS') {
    const salads = await Salads.deleteOne({ _id: req.ID });
    res.result = 'Salad item deleted';
  } else if (req.category === 'DESSERTS') {
    const desserts = await Desserts.deleteOne({ _id: req.ID });
    res.result = 'Desserts item deleted';
  } else if (req.category === 'MAIN_COURSE') {
    const mainCourse = await MainCourse.deleteOne({ _id: req.ID });
    res.Result = 'MainCourse item deleted';
  }
  return res;
};

const updateRestProfile = async (req) => {
  const res = {};
  await Restaurant.updateOne({ RestaurantID: req.ID }, { ...req });
  res.Result = 'Updated Restaurant Profile';
  return res;
};

const restSearchResults = async (req) => {
  const { filter, searchString } = req;
  let restaurantData = [];
  const res = {};
  if (filter === '1') {
    restaurantData = await Restaurant.find({
      name: { $regex: `${searchString}`, $options: 'i' },
    });
  } else if (filter === '2') {
    const appetizerRestID = await Appetizer.find(
      {
        Dishname: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const beveragesRestID = await Beverage.find(
      {
        Dishname: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const mainCourseRestID = await MainCourse.find(
      {
        Dishname: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const dessertRestID = await Desserts.find(
      {
        Dishname: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const saladRestID = await Salads.find(
      {
        Dishname: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const apptizerRestaurantID = appetizerRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const beverageRestaurantID = beveragesRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const mainCourdeRestaurantID = mainCourseRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const saladsRestaurantID = saladRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const dessertsRestaurantID = dessertRestID.map((restID) => {
      return restID.RestaurantID;
    });

    restaurantData = await Restaurant.find({
      RestaurantID: {
        $in: [
          ...apptizerRestaurantID,
          ...beverageRestaurantID,
          ...mainCourdeRestaurantID,
          ...saladsRestaurantID,
          ...dessertsRestaurantID,
        ],
      },
    });
  } else if (filter === '3') {
    const appetizerRestID = await Appetizer.find(
      {
        Cuisine: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const beveragesRestID = await Beverage.find(
      {
        Cuisine: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const mainCourseRestID = await MainCourse.find(
      {
        Cuisine: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const dessertRestID = await Desserts.find(
      {
        Cuisine: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const saladRestID = await Salads.find(
      {
        Cuisine: { $regex: `${searchString}`, $options: 'i' },
      },
      { _id: 0, RestaurantID: 1 }
    );
    const apptizerRestaurantID = appetizerRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const beverageRestaurantID = beveragesRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const mainCourdeRestaurantID = mainCourseRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const saladsRestaurantID = saladRestID.map((restID) => {
      return restID.RestaurantID;
    });
    const dessertsRestaurantID = dessertRestID.map((restID) => {
      return restID.RestaurantID;
    });

    restaurantData = await Restaurant.find({
      RestaurantID: {
        $in: [
          ...apptizerRestaurantID,
          ...beverageRestaurantID,
          ...mainCourdeRestaurantID,
          ...saladsRestaurantID,
          ...dessertsRestaurantID,
        ],
      },
    });
  } else {
    restaurantData = await Restaurant.aggregate([
      {
        $addFields: {
          restLocation: {
            $concat: ['$state', ', ', '$city', ', ', '$streetAddress'],
          },
        },
      },
      {
        $match: {
          restLocation: {
            $regex: `${searchString}`,
            $options: 'i',
          },
        },
      },
    ]);
  }

  res.Result = restaurantData;
  return res;
};

const writeAReview = async (req) => {
  const res = {};
  const review = new Review({ ...req });
  // eslint-disable-next-line no-unused-vars
  await review.save();
  await Restaurant.findOne({ RestaurantID: req.RestaurantID }, async (error, result) => {
    const totalReviewCount = Number(result.TotalReviewCount);
    const totalRatings = result.TotalRatings;
    await Restaurant.updateOne(
      { RestaurantID: req.RestaurantID },
      {
        TotalReviewCount: totalReviewCount + 1,
        TotalRatings: totalRatings + Number(req.Ratings),
      }
    );
  });
  res.Result = 'Review submitted';
  return res;
};

module.exports = {
  restaurantSignup,
  fetchRestaurantProfile,
  insertFood,
  updateFood,
  deleteFood,
  updateRestProfile,
  restSearchResults,
  writeAReview,
};
