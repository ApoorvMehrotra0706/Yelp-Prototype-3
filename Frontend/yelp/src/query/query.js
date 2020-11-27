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

export { staticDataQuery, customerProfileQuery };
