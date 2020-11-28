import { gql } from 'apollo-boost';

const restSignUp = gql`
  mutation(
    $emailID: String
    $Password: String
    $name: String
    $Role: String
    $contact: String
    $streetAddress: String
    $city: String
    $state: String
    $country: String
    $zip: Int
  ) {
    restSignUp(
      emailID: $emailID
      Password: $Password
      name: $name
      Role: $Role
      contact: $contact
      streetAddress: $streetAddress
      city: $city
      state: $state
      country: $country
      zip: $zip
    ) {
      Result
    }
  }
`;

const custSignUp = gql`
  mutation(
    $emailID: String
    $Password: String
    $name: String
    $Role: String
    $gender: String
    $contact: String
    $country: String
    $state: String
    $streetAddress: String
    $City: String
    $zip: Int
  ) {
    custSignUp(
      emailID: $emailID
      Password: $Password
      name: $name
      Role: $Role
      gender: $gender
      contact: $contact
      country: $country
      state: $state
      streetAddress: $streetAddress
      City: $City
      zip: $zip
    ) {
      Result
    }
  }
`;

const custLogin = gql`
  mutation($emailID: String, $Password: String) {
    custLogin(emailID: $emailID, password: $Password) {
      Result
      _id
      emailID
      Role
    }
  }
`;

const updateCustProfile = gql`
  mutation(
    $CustomerID: String
    $name: String
    $gender: String
    $DOB: String
    $NickName: String
    $city: String
    $streetAddress: String
    $City: String
    $YelpingSince: String
    $state: String
    $country: String
    $zip: Int
    $Headline: String
    $Find_Me_In: String
    $Things_Customer_Love: String
    $Website: String
  ) {
    updateCustProfile(
      name: $name
      CustomerID: $CustomerID
      gender: $gender
      DOB: $DOB
      NickName: $NickName
      city: $city
      streetAddress: $streetAddress
      City: $City
      YelpingSince: $YelpingSince
      state: $state
      country: $country
      zip: $zip
      Headline: $Headline
      Find_Me_In: $Find_Me_In
      Things_Customer_Love: $Things_Customer_Love
      Website: $Website
    ) {
      Result
    }
  }
`;

const updateCustContact = gql`
  mutation($emailID: String, $contact: String, $CustomerID: String) {
    updateCustContact(
      emailID: $emailID
      contact: $contact
      CustomerID: $CustomerID
      Contact: $contact
    ) {
      Result
    }
  }
`;

const restLogin = gql`
  mutation($emailID: String, $password: String) {
    restLogin(emailID: $emailID, password: $password) {
      Result
      _id
      emailID
      Role
    }
  }
`;

const updateRestProfile = gql`
  mutation(
    $ID: String
    $name: String
    $contact: String
    $streetAddress: String
    $city: String
    $state: String
    $country: String
    $zip: Int
    $Opening_Time: String
    $Closing_Time: String
    $Curbside_Pickup: Boolean
    $Dine_In: Boolean
    $Yelp_Delivery: Boolean
  ) {
    updateRestProfile(
      ID: $ID
      name: $name
      contact: $contact
      streetAddress: $streetAddress
      city: $city
      state: $state
      country: $country
      zip: $zip
      Opening_Time: $Opening_Time
      Closing_Time: $Closing_Time
      Curbside_Pickup: $Curbside_Pickup
      Dine_In: $Dine_In
      Yelp_Delivery: $Yelp_Delivery
    ) {
      Result
    }
  }
`;

const insertFood = gql`
  mutation(
    $category: String
    $RestaurantID: String
    $Dishname: String
    $Price: Float
    $Cuisine: String
    $Main_Ingredients: String
    $Description: String
  ) {
    insertFood(
      category: $category
      RestaurantID: $RestaurantID
      Dishname: $Dishname
      Price: $Price
      Cuisine: $Cuisine
      Main_Ingredients: $Main_Ingredients
      Description: $Description
    ) {
      Result
    }
  }
`;

const deleteFood = gql`
  mutation($ID: String, $category: String) {
    deleteFood(ID: $ID, category: $category) {
      Result
    }
  }
`;

const updateFood = gql`
  mutation(
    $category: String
    $RestaurantID: String
    $Dishname: String
    $Price: Float
    $Cuisine: String
    $Main_Ingredients: String
    $Description: String
  ) {
    updateFood(
      category: $category
      RestaurantID: $RestaurantID
      Dishname: $Dishname
      Price: $Price
      Cuisine: $Cuisine
      Main_Ingredients: $Main_Ingredients
      Description: $Description
    ) {
      Result
    }
  }
`;

const writeReview = gql`
  mutation(
    $RestaurantID: String
    $RestaurantName: String
    $Review: String
    $Ratings: Int
    $CustomerID: String
    $CustomerName: String
  ) {
    writeReview(
      RestaurantID: $RestaurantID
      RestaurantName: $RestaurantName
      Review: $Review
      Ratings: $Ratings
      CustomerID: $CustomerID
      CustomerName: $CustomerName
    ) {
      Result
    }
  }
`;

const generateOrder = gql`
  mutation(
    $RestaurantID: String
    $RestaurantName: String
    $CustomerID: String
    $CustomerName: String
    $CustomerGender: String
    $CustomerContact: String
    $CustomerYelpingSince: String
    $Date: String
    $Bill: Float
    $StatusID: Int
    $Status: String
    $State: String
    $Address: String
    $DeliveryMode: String
  ) {
    generateOrder(
      RestaurantID: $RestaurantID
      RestaurantName: $RestaurantName
      CustomerID: $CustomerID
      CustomerName: $CustomerName
      CustomerGender: $CustomerGender
      CustomerContact: $CustomerContact
      CustomerYelpingSince: $CustomerYelpingSince
      Date: $Date
      Bill: $Bill
      StatusID: $StatusID
      Status: $Status
      State: $State
      Address: $Address
      DeliveryMode: $DeliveryMode
    ) {
      Result
      _id
    }
  }
`;

const foodCartEntry = gql`
  mutation(
    $OrderID: String
    $Dishname: String
    $Price: Float
    $Quantity: String
    $TotalPrice: Float
    $RestaurantID: String
    $CustomerID: String
  ) {
    foodCartEntry(
      OrderID: $OrderID
      Dishname: $Dishname
      Price: $Price
      Quantity: $Quantity
      TotalPrice: $TotalPrice
      RestaurantID: $RestaurantID
      CustomerID: $CustomerID
    ) {
      Result
    }
  }
`;

export {
  restSignUp,
  custSignUp,
  custLogin,
  updateCustProfile,
  updateCustContact,
  restLogin,
  updateRestProfile,
  insertFood,
  deleteFood,
  updateFood,
  writeReview,
  generateOrder,
  foodCartEntry,
};
