import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../config';
import { connect } from 'react-redux';
import moment from 'moment';
import { graphql, Query, withApollo } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { staticDataQuery, customerProfileQuery } from '../../query/query';

// create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateNames: [],
      countryNames: [],
      genderNames: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // axios.get(serverUrl + 'staticData/fetchStaticData')
    this.props.client.query({ query: staticDataQuery }).then((response) => {
      console.log(response.data.StaticData);
      //update the state with the response data
      let stateDetails = response.data.StaticData.StateName.map((state) => {
        return { key: state._id, value: state.StateName };
      });
      this.setState({
        stateNames: this.state.stateNames.concat(stateDetails),
      });
      let countryDetails = response.data.StaticData.CountryName.map((country) => {
        return { key: country._id, value: country.CountryName };
      });
      this.setState({
        countryNames: this.state.countryNames.concat(countryDetails),
      });
      let genderDetails = response.data.StaticData.GenderName.map((gender) => {
        return { key: gender._id, value: gender.GenderName };
      });
      this.setState({
        genderNames: this.state.genderNames.concat(genderDetails),
      });
      let payload = {
        stateNames: this.state.stateNames,
        countryNames: this.state.countryNames,
        genderNames: this.state.genderNames,
      };
      this.props.updateStaticDataInfo(payload);

      // Loading customer Profile
      if (localStorage.getItem('role') === 'Customer') {
        this.props.client
          .query({
            query: customerProfileQuery,
            variables: {
              id: localStorage.getItem('CustomerID'),
            },
            fetchPolicy: 'network-only',
          })
          .then((response) => {
            console.log(response.data.CustomerProfile);
            let DOB = moment.utc(parseInt(response.data.CustomerProfile.DOB));
            DOB = DOB.format('YYYY-MM-DD');
            localStorage.setItem('Name', response.data.CustomerProfile.name);
            let payload = {
              Name: response.data.CustomerProfile.name,
              NickName: response.data.CustomerProfile.NickName,
              DOB: DOB,
              City: response.data.CustomerProfile.City,
              State: response.data.CustomerProfile.state,
              Address: response.data.CustomerProfile.City.concat(', ').concat(
                response.data.CustomerProfile.state
              ),
              Gender: response.data.CustomerProfile.gender,
              streetAddress: response.data.CustomerProfile.streetAddress,
              Country: response.data.CustomerProfile.country,
              zip: response.data.CustomerProfile.zip,
              Headline: response.data.CustomerProfile.Headline,
              Contact: response.data.CustomerProfile.contact,
              ILove: response.data.CustomerProfile.Things_Customer_Love,
              Find_Me_In: response.data.CustomerProfile.Find_Me_In,
              YelpingSince: new Date(parseInt(response.data.CustomerProfile.YelpingSince)),
              Website: response.data.CustomerProfile.Website,
              ImageURL: response.data.CustomerProfile.ImageURL,
            };
            this.props.updateCustomerProfile(payload);
            payload = {
              Contact: response.data.CustomerProfile.contact,
              EmailID: localStorage.getItem('username'),
              NewEmailID: localStorage.getItem('username'),
              NewContact: response.data.CustomerProfile.contact,
            };
            this.props.updateCustomerContactInfo(payload);
          });
      }
    });
  }

  // handle logout to destroy the cookie
  handleLogout = () => {
    const data = {
      role: localStorage.getItem('role'),
    };
    let url = '';
    // if (data.role === 'Customer') url = serverUrl + 'customer/logoutCustomer';
    // else url = serverUrl + 'restaurant/restaurantLogout';
    // axios
    //   .post(url, data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       this.setState({
    //         authFlag: false,
    //       });

    //       let payload = {
    //         emailID: '',
    //         role: '',
    //         loginStatus: 'false',
    //       };
    //       this.props.updateLoginInfo(payload);
    //       payload = {
    //         emailID: '',
    //         role: '',
    //         signupStatus: '',
    //       };
    //       this.props.updateSignUpInfo(payload);
    //       payload = {
    //         Name: '',
    //       };
    //       this.props.updateNameInfo(payload);
    //     } else {
    //       this.setState({
    //         authFlag: true,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       errorFlag: 1,
    //     });
    //   });
    localStorage.clear();
  };
  render() {
    // if Token is set render Logout Button
    let navLogin = null;
    if (localStorage.getItem('role')) {
      console.log('Able to read role');
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      // Else display login button
      console.log('Not Able to read role');
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/customerLogin">
              <span class="glyphicon glyphicon-log-in"></span> User Login
            </Link>
          </li>
          <li>
            <Link to="/restaurantLogin">
              <span class="glyphicon glyphicon-log-in"></span> Biz Login
            </Link>
          </li>
          <li>
            <Link to="/customerSignup">
              <span class="glyphicon glyphicon-log-in"></span>User Signup
            </Link>
          </li>
          <li>
            <Link to="/restaurantSignup">
              <span class="glyphicon glyphicon-log-in"></span>Biz Signup
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (localStorage.getItem('role') && this.props.location.pathname === '/login') {
      redirectVar = <Redirect to="/home" />;
    }

    if (!localStorage.getItem('role') && this.props.location.pathname !== '/login') {
      redirectVar = <Redirect to="/webPage" />;
    }

    if (localStorage.getItem('role') === 'Restaurant') {
      if (this.props.location.pathname === '/RestaurantList') {
        redirectVar = <Redirect to="/RestaurantList" />;
      } else if (this.props.location.pathname === '/RestaurantPage') {
        redirectVar = <Redirect to="/RestaurantPage" />;
      } else if (this.props.location.pathname === '/restaurantProfile') {
        redirectVar = <Redirect to="/restaurantProfile" />;
      } else if (this.props.location.pathname === '/restaurantMenu') {
        redirectVar = <Redirect to="/restaurantMenu" />;
      } else if (this.props.location.pathname === '/restaurantOrders') {
        redirectVar = <Redirect to="/restaurantOrders" />;
      } else if (this.props.location.pathname === '/restaurantReview') {
        redirectVar = <Redirect to="/restaurantReview" />;
      }
      // else {
      //   redirectVar = <Redirect to="/webPage" />;
      // }
    }

    let options = null;
    if (!localStorage.getItem('role')) {
      options = (
        <ul class="nav navbar-nav">
          <li class={this.props.location.pathname === '/search' && 'active'}>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      );
    } else if (localStorage.getItem('role') === 'Restaurant') {
      options = (
        <ul class="nav navbar-nav">
          <li class={this.props.location.pathname === '/restaurantProfile' && 'active'}>
            <Link to="/restaurantProfile">Profile</Link>
          </li>
          <li class={this.props.location.pathname === '/restaurantMenu' && 'active'}>
            <Link to="/restaurantMenu">Food Menu</Link>
          </li>
          <li class={this.props.location.pathname === '/restaurantOrders' && 'active'}>
            <Link to="/restaurantOrders">Orders</Link>
          </li>
          <li class={this.props.location.pathname === '/restaurantReview' && 'active'}>
            <Link to="/restaurantReview">Review</Link>
          </li>
        </ul>
      );
    } else if (localStorage.getItem('role') === 'Customer') {
      options = (
        <ul class="nav navbar-nav">
          <li class={this.props.location.pathname === '/customerProfile' && 'active'}>
            <Link to="/customerProfile">Profile</Link>
          </li>
          <li class={this.props.location.pathname === '/customerProfileUpdate' && 'active'}>
            <Link to="/customerProfileUpdate">Profile Update</Link>
          </li>
          <li class={this.props.location.pathname === '/customerContactUpdate' && 'active'}>
            <Link to="/customerContactUpdate">Contact Info Update</Link>
          </li>
          <li class={this.props.location.pathname === '/search' && 'active'}>
            <Link to="/search">Search</Link>
          </li>
          <li class={this.props.location.pathname === '/orderHistory' && 'active'}>
            <Link to="/orderHistory">Order History</Link>
          </li>
        </ul>
      );
    }
    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a className="navbar-brand">
                <Link to="/WebPage">Yelp</Link>
              </a>
            </div>

            {options}
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginInfo: (payload) => {
      dispatch({
        type: 'update-login-field',
        payload,
      });
    },
    updateSignUpInfo: (payload) => {
      dispatch({
        type: 'signup-field-update',
        payload,
      });
    },
    updateNameInfo: (payload) => {
      dispatch({
        type: 'update-name-field',
        payload,
      });
    },
    updateStaticDataInfo: (payload) => {
      dispatch({
        type: 'update-static-field',
        payload,
      });
    },
    updateCustomerProfile: (payload) => {
      dispatch({
        type: 'update-customer-profile',
        payload,
      });
    },
    updateCustomerContactInfo: (payload) => {
      dispatch({
        type: 'customer-contact-info',
        payload,
      });
    },
  };
};

// export default connect(null, mapDispatchToProps)(Navbar);
export default compose(
  withApollo,
  graphql(staticDataQuery, { name: 'staticDataQuery' }),
  graphql(customerProfileQuery, { name: 'customerProfileQuery' }),
  connect(null, mapDispatchToProps)
)(Navbar);
