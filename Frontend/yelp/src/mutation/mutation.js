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

export { restSignUp, custSignUp };
