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

export { staticDataQuery, customerProfileQuery, restaurantProfileQuery, searchRestaurantQuery };
