import { gql } from 'apollo-boost';

const staticDataQuery = gql`
  query StaticData {
    StaticData {
      CountryName {
        CountryName
      }
      CuisineName {
        CuisineName
      }
      StateName {
        StateName
      }
      GenderName {
        GenderName
      }
    }
  }
`;

const customerProfileQuery = gql`
  query CustomerProfile($id: String) {
    CustomerProfile(id: $id) {
      name
      gender
      NickName
      city
      state
      City
      gender
      streetAddress
      country
      zip
      Headline
      contact
      Things_Customer_Love
      Find_Me_In
      YelpingSince
      Website
      ImageURL
      DOB
    }
  }
`;

const restaurantProfileQuery = gql`
  query RestaurantProfile($id: String) {
    RestaurantProfile(id: $id) {
      name
      emailID
      contact
      streetAddress
      city
      state
      country
      zip
      Description
      Opening_Time
      Closing_Time
      Curbside_Pickup
      Dine_In
      Yelp_Delivery
      Latitude
      Longitude
      Appetizers {
        _id
        Dishname
        Price
        Cuisine
        Main_Ingredients
        Description
      }
      Beverage {
        _id
        Dishname
        Price
        Cuisine
        Main_Ingredients
        Description
      }
      Dessert {
        _id
        Dishname
        Price
        Cuisine
        Main_Ingredients
        Description
      }
      Main_Course {
        _id
        Dishname
        Price
        Cuisine
        Main_Ingredients
        Description
      }
      Salad {
        _id
        Dishname
        Price
        Cuisine
        Main_Ingredients
        Description
      }
      Review {
        _id
        Ratings
        Date
        Review
        CustomerID
        CustomerName
      }
      Orders {
        _id
        CustomerID
        RestaurantName
        CustomerName
        Date
        Bill
        OrderCartType {
          Dishname
          Price
          TotalPrice
          Quantity
          CustomerID
          RestaurantID
        }
      }
      TotalReviewCount
      TotalRatings
    }
  }
`;

const searchRestaurantQuery = gql`
  query SearchRestaurant($filter: String, $searchString: String) {
    SearchRestaurant(filter: $filter, searchString: $searchString) {
      RestaurantSearchList {
        _id
        name
        RestaurantID
        emailID
        contact
        streetAddress
        city
        state
        country
        zip
        Description
        Opening_Time
        Closing_Time
        Curbside_Pickup
        Dine_In
        Yelp_Delivery
        Latitude
        Longitude
        TotalReviewCount
        TotalRatings
      }
    }
  }
`;

const restSearchOrderFilterQuery = gql`
  query RestSearchOrderFilter($RestaurantID: String, $sortOrder: String) {
    RestSearchOrderFilter(RestaurantID: $RestaurantID, sortOrder: $sortOrder) {
      OrderSearchList {
        _id
        RestaurantID
        RestaurantName
        CustomerID
        CustomerName
        CustomerGender
        CustomerContact
        CustomerYelpingSince
        Date
        Bill
        DeliveryMode
        StatusID
        Status
        State
        Address
        OrderCartType {
          OrderID
          Dishname
          Price
          Quantity
          TotalPrice
          RestaurantID
        }
      }
    }
  }
`;

const custSearchOrderFilterQuery = gql`
  query CustSearchOrderFilter(
    $CustomerID: String
    $filter1: String
    $filter2: String
    $sortOrder: Int
  ) {
    CustSearchOrderFilter(
      CustomerID: $CustomerID
      filter1: $filter1
      filter2: $filter2
      sortOrder: $sortOrder
    ) {
      OrderSearchList {
        _id
        RestaurantID
        RestaurantName
        Date
        Bill
        DeliveryMode
        StatusID
        Status
        State
        Address
        OrderCartType {
          OrderID
          Dishname
          Price
          Quantity
          TotalPrice
          RestaurantID
        }
      }
    }
  }
`;

export {
  staticDataQuery,
  customerProfileQuery,
  restaurantProfileQuery,
  searchRestaurantQuery,
  restSearchOrderFilterQuery,
  custSearchOrderFilterQuery,
};
