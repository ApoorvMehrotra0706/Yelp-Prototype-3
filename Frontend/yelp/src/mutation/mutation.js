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

export { restSignUp, custSignUp, custLogin, updateCustProfile };
