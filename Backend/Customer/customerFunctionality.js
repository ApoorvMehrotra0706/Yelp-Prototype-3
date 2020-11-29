const bcrypt = require('bcrypt');
const Customer = require('../models/CustomerModel');
const Login = require('../models/LoginModel');
const Restaurant = require('../models/RestaurantModel');
const Review = require('../models/ReviewsModel');
const Appetizer = require('../models/Appetizer');
const Beverage = require('../models/Beverages');
const MainCourse = require('../models/Main_Course');
const Salads = require('../models/Salads');
const Desserts = require('../models/Desserts');
const Orders = require('../models/OrdersModel');

const custSignup = async (req) => {
  const res = {};

  const customer = await Login.findOne({ emailID: req.emailID, Role: 'Customer' });
  if (customer) {
    res.Result = 'EmailID already in use';
  } else {
    const Password = await bcrypt.hash(req.Password, 10);
    const login = new Login({
      ...req,
      Password,
      Role: 'Customer',
    });
    const customerLogin = await login.save();

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    const customerModelData = new Customer({
      ...req,
      // eslint-disable-next-line no-underscore-dangle
      CustomerID: customerLogin._id,
      YelpingSince: today,
    });
    // eslint-disable-next-line no-unused-vars
    await customerModelData.save();
    res.Result = 'Successfully Created';
  }
  return res;
};

const custLogin = async (req) => {
  const res = {};
  res.Result = 'Login successful';

  const user = await Login.findOne({ emailID: req.emailID, Role: 'Customer' });
  if (user) {
    if (await bcrypt.compare(req.password, user.Password)) {
      res.Result = 'Login successful';
      // eslint-disable-next-line no-underscore-dangle
      res._id = user._id;
      res.emailID = user.emailID;
      res.Role = user.Role;
    } else {
      res.Result = 'Invalid credentails';
    }
  } else {
    res.Result = 'ID not found';
  }
  return res;
};

const fetchCustomerProfile = async (req) => {
  let res = null;
  const CustomerID = req.id;
  res = await Customer.findOne({ CustomerID });
  return res;
};

const updateCustProfile = async (req) => {
  const res = {};
  await Customer.updateOne({ CustomerID: req.CustomerID }, { ...req });
  res.Result = 'Customer Profile Updated';
  return res;
};

const updateCustContact = async (req) => {
  const res = {};
  // eslint-disable-next-line no-underscore-dangle
  await Login.updateOne({ _id: req.CustomerID }, { ...req });
  await Customer.updateOne({ CustomerID: req.CustomerID }, { ...req });
  res.Result = 'Customer Profile Updated';
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

  res.RestaurantSearchList = restaurantData;
  res.Result = 'Found these entries';
  return res;
};

const writeAReview = async (req) => {
  const res = {};
  const review = new Review({ ...req, Date: new Date() });
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

const generateOrder = async (req) => {
  const order = new Orders({ ...req });
  const res = {};
  const result = await order.save();
  // eslint-disable-next-line no-underscore-dangle
  res._id = result._id;
  res.Result = 'Order saved';
  return res;
};

const foodCartEntry = async (req) => {
  await Orders.updateOne({ _id: req.OrderID }, { $push: { OrderCartType: req } });
  const res = {};
  res.Result = 'Inserted the food entry';
  return res;
};

const custOrderSearchResults = async (req) => {
  const res = {};
  let orderDetails = [];
  if (req.filter1 !== 'All') {
    orderDetails = await Orders.find({
      CustomerID: req.CustomerID,
      DeliveryMode: req.filter1,
      Status: req.filter2,
    })
      .sort({ Date: req.sortOrder })
      .exec();
    res.OrderSearchList = orderDetails;
  } else {
    // eslint-disable-next-line no-unused-vars
    orderDetails = await Orders.find({ CustomerID: req.CustomerID })
      .sort({ Date: req.sortOrder })
      .exec();
    res.OrderSearchList = orderDetails;
  }
  return res;
};

module.exports = {
  fetchCustomerProfile,
  custSignup,
  custLogin,
  updateCustProfile,
  restSearchResults,
  writeAReview,
  generateOrder,
  custOrderSearchResults,
  updateCustContact,
  foodCartEntry,
};
