import { gql } from 'apollo-boost';

// const staticDataQuery = gql`
//   query StaticData {
//     CountryName {
//       CountryName
//     }
//     CuisineName {
//       CuisineName
//     }
//     StateName {
//       StateName
//     }
//     GenderName {
//       GenderName
//     }
//   }
// `;

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

export { staticDataQuery };
