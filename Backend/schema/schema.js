/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
const bcrypt = require('bcrypt');

const { GraphQLError } = require('graphql');

const graphql = require('graphql');

const Restaurant = require('../models/RestaurantModel');
const Customer = require('../models/CustomerModel');
const Appetizer = require('../models/Appetizer');
const Beverages = require('../models/Beverages');
const Desserts = require('../models/Desserts');
const MainCourse = require('../models/Main_Course');
const Salads = require('../models/Salads');
const Reviews = require('../models/ReviewsModel');
const Orders = require('../models/OrdersModel');
const OrderCart = require('../models/OrdersCart');
const Login = require('../models/LoginModel');
const {
  fetchCustomerProfile,
  custSignup,
  updateCustProfile,
} = require('../Customer/customerFucntionality');
const {
  restaurantSignup,
  fetchRestaurantProfile,
  insertFood,
  updateFood,
  deleteFood,
  updateRestProfile,
  restSearchResults,
  writeAReview,
} = require('../Restaurant/restaurantFunctionality');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLLong,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const SignupType = new GraphQLObjectType({
  name: 'SignupType',
  fields: () => ({
    emailID: {
      type: GraphQLString,
    },
    Password: {
      type: GraphQLString,
    },
    Role: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
    Restaurant: {
      type: RestaurantType,
      resolve(parent, args) {
        return Restaurant.find({ RestaurantID: parent._id }).exec();
      },
    },
    Customer: {
      type: CustomerType,
      resolve(parent, args) {
        return Customer.find({ CustomerID: parent._id }).exec();
      },
    },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: 'RestaurantType',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    RestaurantID: {
      type: GraphQLID,
    },
    emailID: {
      type: GraphQLString,
    },
    contact: {
      type: GraphQLString,
    },
    streetAddress: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    zip: {
      type: GraphQLInt,
    },
    ImageURL: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    Opening_Time: {
      type: GraphQLString,
    },
    Closing_Time: {
      type: GraphQLString,
    },
    Curbside_Pickup: {
      type: GraphQLBoolean,
    },
    Dine_In: {
      type: GraphQLBoolean,
    },
    Yelp_Delivery: {
      type: GraphQLBoolean,
    },
    Latitude: {
      type: GraphQLString,
    },
    Longitude: {
      type: GraphQLString,
    },
    TotalReviewCount: {
      type: GraphQLString,
    },
    TotalRatings: {
      type: GraphQLInt,
    },
    Result: {
      type: GraphQLString,
    },
    Appetizers: {
      type: new GraphQLList(AppetizerType),
      resolve(parent, args) {
        return Appetizer.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Beverage: {
      type: new GraphQLList(BeverageType),
      resolve(parent, args) {
        return Beverages.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Dessert: {
      type: new GraphQLList(DessertType),
      resolve(parent, args) {
        return Desserts.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Main_Course: {
      type: new GraphQLList(Main_CourseType),
      resolve(parent, args) {
        return MainCourse.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Salad: {
      type: new GraphQLList(SaladType),
      resolve(parent, args) {
        return Salads.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Orders: {
      type: new GraphQLList(OrdersType),
      resolve(parent, args) {
        return Orders.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Reviews.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: 'CustomerType',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    CustomerID: {
      type: GraphQLID,
    },
    gender: {
      type: GraphQLString,
    },
    DOB: {
      type: GraphQLInt,
    },
    NickName: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    contact: {
      type: GraphQLString,
    },
    streetAddress: {
      type: GraphQLString,
    },
    City: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    Contact: {
      type: GraphQLString,
    },
    zip: {
      type: GraphQLInt,
    },
    ImageURL: {
      type: GraphQLString,
    },
    Headline: {
      type: GraphQLString,
    },
    Find_Me_In: {
      type: GraphQLString,
    },
    YelpingSince: {
      type: GraphQLString,
    },
    Things_Customer_Love: {
      type: GraphQLString,
    },
    Website: {
      type: GraphQLString,
    },
    TotalRatings: {
      type: GraphQLInt,
    },
    Result: {
      type: GraphQLString,
    },
    Orders: {
      type: new GraphQLList(OrdersType),
      resolve(parent, args) {
        return Orders.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Reviews.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
  }),
});

const AppetizerType = new GraphQLObjectType({
  name: 'AppetizerType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLInt,
    },
    Dishname: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Main_Ingredients: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const BeverageType = new GraphQLObjectType({
  name: 'BeverageType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLInt,
    },
    Dishname: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Main_Ingredients: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const DessertType = new GraphQLObjectType({
  name: 'DessertType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLInt,
    },
    Dishname: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Main_Ingredients: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const Main_CourseType = new GraphQLObjectType({
  name: 'Main_CourseType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLInt,
    },
    Dishname: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Main_Ingredients: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
  }),
});

const SaladType = new GraphQLObjectType({
  name: 'SaladType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLInt,
    },
    Dishname: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Main_Ingredients: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const FoodMenuType = new GraphQLObjectType({
  name: 'FoodMenuType',
  fields: () => ({
    AppetizerName: {
      type: new GraphQLList(AppetizerType),
    },
    BeverageName: {
      type: new GraphQLList(BeverageType),
    },
    DessertName: {
      type: new GraphQLList(DessertType),
    },
    MainCourseName: {
      type: new GraphQLList(Main_CourseType),
    },
    SaladName: {
      type: new GraphQLList(SaladType),
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const RestSearchType = new GraphQLObjectType({
  name: 'RestSearchType',
  fields: () => ({
    RestaurantSearchList: {
      type: new GraphQLList(RestaurantType),
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const CuisineType = new GraphQLObjectType({
  name: 'CuisineType',
  fields: () => ({
    CuisineName: {
      type: GraphQLString,
    },
  }),
});

const CountryType = new GraphQLObjectType({
  name: 'CountryType',
  fields: () => ({
    CountryName: {
      type: GraphQLString,
    },
  }),
});

const GenderType = new GraphQLObjectType({
  name: 'GenderType',
  fields: () => ({
    GenderName: {
      type: GraphQLString,
    },
  }),
});

const OrdersType = new GraphQLObjectType({
  name: 'OrdersType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLInt,
    },
    RestaurantName: {
      type: GraphQLString,
    },
    CustomerID: {
      type: GraphQLString,
    },
    CustomerName: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    CustomerGender: {
      type: GraphQLString,
    },
    CustomerContact: {
      type: GraphQLString,
    },
    CustomerYelpingSince: {
      type: GraphQLString,
    },
    Date: {
      type: GraphQLString,
    },
    Bill: {
      type: GraphQLInt,
    },
    DeliveryMode: {
      type: GraphQLString,
    },
    StatusID: {
      type: GraphQLInt,
    },
    Status: {
      type: GraphQLString,
    },
    State: {
      type: GraphQLString,
    },
    Address: {
      type: GraphQLString,
    },
    OrderCart: {
      type: OrderCartType,
      resolve(parent, args) {
        return Reviews.find({ OrderID: parent._id }).exec();
      },
    },
  }),
});

const OrderCartType = new GraphQLObjectType({
  name: 'OrderCartType',
  fields: () => ({
    Dishname: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
    Quantity: {
      type: GraphQLInt,
    },
    TotalPrice: {
      type: GraphQLFloat,
    },
    RestaurantID: {
      type: GraphQLString,
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: () => ({
    CustomerID: {
      type: GraphQLString,
    },
    CustomerName: {
      type: GraphQLString,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    RestaurantName: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    Ratings: {
      type: GraphQLInt,
    },
    Review: {
      type: GraphQLString,
    },
    Date: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const StateType = new GraphQLObjectType({
  name: 'StateType',
  fields: () => ({
    StateName: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    CustomerProfile: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const result = fetchCustomerProfile(args);
        return result;
      },
    },
    RestaurantProfile: {
      type: RestaurantType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return fetchRestaurantProfile(args);
      },
    },
    SearchRestaurant: {
      type: RestSearchType,
      args: {
        filter: {
          type: GraphQLString,
        },
        searchString: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return restSearchResults(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    custSignUp: {
      type: SignupType,
      args: {
        emailID: {
          type: GraphQLString,
        },
        Password: {
          type: GraphQLString,
        },
        Role: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        gender: {
          type: GraphQLString,
        },
        DOB: {
          type: GraphQLInt,
        },
        NickName: {
          type: GraphQLString,
        },
        contact: {
          type: GraphQLString,
        },
        streetAddress: {
          type: GraphQLString,
        },
        City: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        Contact: {
          type: GraphQLString,
        },
        zip: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        return custSignup(args);
      },
    },
    restSignUp: {
      type: SignupType,
      args: {
        emailID: {
          type: GraphQLString,
        },
        Password: {
          type: GraphQLString,
        },
        Role: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        RestaurantID: {
          type: GraphQLID,
        },
        contact: {
          type: GraphQLString,
        },
        streetAddress: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        zip: {
          type: GraphQLInt,
        },
        ImageURL: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        Opening_Time: {
          type: GraphQLString,
        },
        Closing_Time: {
          type: GraphQLString,
        },
        Curbside_Pickup: {
          type: graphql.GraphQLBoolean,
        },
        Dine_In: {
          type: graphql.GraphQLBoolean,
        },
        Yelp_Delivery: {
          type: graphql.GraphQLBoolean,
        },
        Latitude: {
          type: GraphQLString,
        },
        Longitude: {
          type: GraphQLString,
        },
        TotalReviewCount: {
          type: GraphQLString,
        },
        TotalRatings: {
          type: GraphQLInt,
        },
        Appetizers: {
          type: GraphQLString,
        },
        Beverage: {
          type: GraphQLString,
        },
        Dessert: {
          type: GraphQLString,
        },
        Main_Course: {
          type: GraphQLString,
        },
        Salad: {
          type: GraphQLString,
        },
        Orders: {
          type: GraphQLString,
        },
        Review: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return restaurantSignup(args);
      },
    },
    insertFood: {
      type: FoodMenuType,

      args: {
        RestaurantID: {
          type: GraphQLString,
        },
        Dishname: {
          type: GraphQLString,
        },
        Main_Ingredients: {
          type: GraphQLString,
        },
        Cuisine: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        ImageURL: {
          type: GraphQLString,
        },
        Price: {
          type: GraphQLFloat,
        },
        category: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return insertFood(args);
      },
    },
    updateFood: {
      type: FoodMenuType,
      args: {
        ID: {
          type: GraphQLID,
        },
        RestaurantID: {
          type: GraphQLString,
        },
        Dishname: {
          type: GraphQLString,
        },
        Main_Ingredients: {
          type: GraphQLString,
        },
        Cuisine: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        ImageURL: {
          type: GraphQLString,
        },
        Price: {
          type: GraphQLFloat,
        },
        category: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return updateFood(args);
      },
    },
    deleteFood: {
      type: FoodMenuType,
      args: {
        ID: {
          type: GraphQLID,
        },
        RestaurantID: {
          type: GraphQLString,
        },
        Dishname: {
          type: GraphQLString,
        },
        Main_Ingredients: {
          type: GraphQLString,
        },
        Cuisine: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        ImageURL: {
          type: GraphQLString,
        },
        Price: {
          type: GraphQLFloat,
        },
        category: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return deleteFood(args);
      },
    },
    updateRestProfile: {
      type: RestaurantType,
      args: {
        ID: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        RestaurantID: {
          type: GraphQLID,
        },
        emailID: {
          type: GraphQLString,
        },
        contact: {
          type: GraphQLString,
        },
        streetAddress: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        zip: {
          type: GraphQLInt,
        },
        ImageURL: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        Opening_Time: {
          type: GraphQLString,
        },
        Closing_Time: {
          type: GraphQLString,
        },
        Curbside_Pickup: {
          type: GraphQLBoolean,
        },
        Dine_In: {
          type: GraphQLBoolean,
        },
        Yelp_Delivery: {
          type: GraphQLBoolean,
        },
      },
      resolve(parent, args) {
        return updateRestProfile(args);
      },
    },
    updateCustProfile: {
      type: CustomerType,
      args: {
        name: {
          type: GraphQLString,
        },
        CustomerID: {
          type: GraphQLID,
        },
        gender: {
          type: GraphQLString,
        },
        DOB: {
          type: GraphQLInt,
        },
        NickName: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        contact: {
          type: GraphQLString,
        },
        streetAddress: {
          type: GraphQLString,
        },
        City: {
          type: GraphQLString,
        },
        YelpingSince: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        Contact: {
          type: GraphQLString,
        },
        zip: {
          type: GraphQLInt,
        },
        ImageURL: {
          type: GraphQLString,
        },
        Headline: {
          type: GraphQLString,
        },
        Find_Me_In: {
          type: GraphQLString,
        },
        Things_Customer_Love: {
          type: GraphQLString,
        },
        Website: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return updateCustProfile(args);
      },
    },
    writeReview: {
      type: ReviewType,
      args: {
        CustomerID: {
          type: GraphQLString,
        },
        CustomerName: {
          type: GraphQLString,
        },
        RestaurantID: {
          type: GraphQLString,
        },
        RestaurantName: {
          type: GraphQLString,
        },
        ImageUrl: {
          type: GraphQLString,
        },
        Ratings: {
          type: GraphQLInt,
        },
        Review: {
          type: GraphQLString,
        },
        Date: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return writeAReview(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
