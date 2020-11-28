import React, { Component } from 'react';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './UpdateProfile.css';
import axios from 'axios';
import serverUrl from '../../config';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import SnackBar from '../../reducer/snackbarReducer';
import { graphql, Query, withApollo } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { updateCustContact } from '../../mutation/mutation';

class UpdateContactInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: { contactError: '', passwordMisMatchError: '', submitError: '' },
      // CountryCodes: [],
      Profile: {
        // Email: '',
        NewEmail: '',
        // ContactNo: '',
        Password: '',
        RetypePassword: '',
        // CountryCode: '',
      },
    };
  }
  componentWillMount() {}

  onEmailChangeHandler = (e) => {
    let payload = {
      NewEmailID: e.target.value,
    };
    this.props.updateCustomerContactInfo(payload);
  };
  onContactNoCHangeHandler = (e) => {
    if (!/^\d+$/.test(e.target.value) && e.target.value.length > 0) {
      this.setState({
        errors: { ...this.state.errors, ...{ contactError: '  Invalid Value!', submitError: '' } },
      });
    } else {
      this.setState({
        errors: { ...this.state.errors, ...{ contactError: '' } },
      });
      let payload = {
        NewContact: e.target.value,
      };
      this.props.updateCustomerContactInfo(payload);
    }
  };

  onPasswordChangeHandler = (e) => {
    this.setState({
      Profile: { ...this.state.Profile, ...{ Password: e.target.value } },
      errors: { ...this.state.errors, ...{ submitError: '' } },
    });
  };
  onRePasswordChangeHandler = (e) => {
    let errors = { ...this.state.errors, ...{ passwordMisMatchError: '' } };
    if (e.target.value !== this.state.Profile.Password) {
      errors = {
        ...this.state.errors,
        ...{
          passwordMisMatchError: '  Both Passwords Are Different!',
          submitError: '',
        },
      };
    }
    this.setState({
      Profile: { ...this.state.Profile, ...{ RetypePassword: e.target.value } },
      errors,
    });
  };

  updateContactInformation = (e) => {
    e.preventDefault();
    const data = {
      Password: this.state.Profile.Password,
      emailID: this.props.customerContactInfo.EmailID,
      newEmailID: this.props.customerContactInfo.NewEmailID,
      contact: this.props.customerContactInfo.NewContact,
    };
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // //make a post request with the user data
    // axios.put(serverUrl + 'customer/updateContactInfo', data)
    this.props.client
      .mutate({
        mutation: updateCustContact,
        variables: {
          emailID: this.props.customerContactInfo.NewEmailID,
          contact: this.props.customerContactInfo.NewContact,
          CustomerID: localStorage.getItem('CustomerID'),
        },
      })
      .then(
        (response) => {
          console.log('Status Code : ', response.data.updateCustContact.Result);
          if (response.data.updateCustContact.Result === 'Customer Profile Updated') {
            let payload = {
              EmailID: this.props.customerContactInfo.NewEmailID,
              // NewEmailID: '',
              Contact: this.props.customerContactInfo.NewContact,
              // NewContact: '',
            };
            this.props.updateCustomerContactInfo(payload);
            if (localStorage.getItem('role')) {
              localStorage.setItem('username', this.props.customerContactInfo.NewEmailID);
            }
            //updateRedirect = <Redirect to="/customerLogin" />;
            alert('Updated Successfully');
          }
        },
        (error) => {
          console.log(error);
          if (error.response.status === 401) {
            this.setState({
              errors: { ...this.state.errors, ...{ submitError: error.response.data } },
            });
          }
        }
      );
  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem('role')) {
      console.log('role not found');
      redirectVar = <Redirect to="/customerLogin" />;
    } else {
      if (localStorage.getItem('role') === 'Customer') {
        redirectVar = null;
      } else if (localStorage.getItem('role') === 'Restaurant') {
        redirectVar = <Redirect to="/RestaurantLandingPage" />;
      } else {
        redirectVar = <Redirect to="/customerLogin" />;
      }
    }
    return (
      <div>
        {redirectVar}
        {this.props.snackbarData != null && <SnackBar />}
        <span id="page-content" class="offscreen">
          &nbsp;
        </span>
        {/* <div className="main-content-wrap main-content-wrap--full">
          <div className="content-container" id="super-container">
            <div className=" clearfix layout-block layout-n column--responsive account-settings_container">
              <div className="column column-beta column--responsive"> */}
        <div class="container">
          <div class="signup-flow on-flow-start">
            <div class="flow-start signup-visible">
              <div class="main-div">
                <div class="panel">
                  <div class="section-header clearfix">
                    <h2>Contact Information</h2>
                  </div>
                  <form
                    onSubmit={this.updateContactInformation}
                    className="profile-bio yform yform-vertical-spacing"
                  >
                    <div class="form-group">
                      <label for="first_name">Email</label>

                      <input
                        maxLength="50"
                        id="Email"
                        name="Email"
                        placeholder=""
                        size="30"
                        type="email"
                        value={this.props.customerContactInfo.NewEmailID}
                        onChange={this.onEmailChangeHandler}
                        required
                      ></input>
                    </div>
                    <div class="form-group">
                      <label for="last_name" style={{ width: '100%' }}>
                        Contact No:
                        <span style={{ color: 'red' }}>
                          {this.state.errors['passwordMisMatchError']}
                        </span>
                      </label>

                      <input
                        style={{ display: 'inline', width: '90%' }}
                        id="ContactNo"
                        maxlength="10"
                        minLength="10"
                        name="ContactNo"
                        placeholder=""
                        size="30"
                        type="text"
                        value={this.props.customerContactInfo.NewContact}
                        onChange={this.onContactNoCHangeHandler}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="nickname">Password</label>
                      <input
                        id="password"
                        maxlength="50"
                        name="password"
                        placeholder=""
                        size="30"
                        type="password"
                        value={this.state.Profile.Password}
                        onChange={this.onPasswordChangeHandler}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="nickname">
                        ReType Password
                        <span style={{ color: 'red' }}>
                          {this.state.errors['passwordMisMatchError']}
                        </span>
                      </label>
                      <input
                        id="repassword"
                        maxlength="50"
                        name="repassword"
                        placeholder=""
                        size="30"
                        type="password"
                        value={this.state.Profile.RetypePassword}
                        onChange={this.onRePasswordChangeHandler}
                        required
                      />
                    </div>
                    <span style={{ color: 'red' }}>{this.state.errors['submitError']}</span>
                    <br />
                    <button
                      disabled={this.state.errors.passwordMisMatchError.length !== 0}
                      type="submit"
                      value="submit"
                      class="ybtn ybtn--primary ybtn-full-responsive-small"
                    >
                      <span>Save Changes</span>
                    </button>
                    <Link to="/AboutMe"> Cancel</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default UpdateProfile;

const mapStateToProps = (state) => {
  const { customerContactInfo } = state.customerContactInfoReducer;
  return {
    customerContactInfo: customerContactInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCustomerContactInfo: (payload) => {
      dispatch({
        type: 'customer-contact-info',
        payload,
      });
    },
  };
};

export default compose(
  withApollo,
  graphql(updateCustContact, { name: 'updateCustContact' }),
  connect(mapStateToProps, mapDispatchToProps)
)(UpdateContactInformation);
