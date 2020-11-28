import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import '../FirstPage/RestaurantHome.css';
import { connect } from 'react-redux';
import { graphql, Query, withApollo } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { restaurantProfileQuery } from '../../query/query';
import { updateRestProfile } from '../../mutation/mutation';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      StateName: '',
      City: '',
      Zip: '',
      Street: '',
      Contact: '',
      Opening_Time: '',
      Closing_Time: '',
      Countries: [],
      States: [],
      isFormDisable: true,
      submitError: false,
      submitErrorBlock: '',
      CurbsidePickup: false,
      DineIn: false,
      YelpDelivery: false,
      ImageUrl: '',
      UploadPic: '',
      tmpEditProfile: {
        Name: '',
        Email: '',
        Country: '',
        StateName: '',
        City: '',
        Zip: '',
        Street: '',
        Contact: '',
        Opening_Time: '',
        Closing_Time: '',
        CurbsidePickup: false,
        DineIn: false,
        YelpDelivery: false,
        ImageUrl: '',
      },
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: restaurantProfileQuery,
        variables: {
          id: localStorage.getItem('RestaurantID'),
        },
        fetchPolicy: 'network-only',
      })
      .then(
        (response) => {
          localStorage.setItem('Name', response.data.RestaurantProfile.name);
          let payload = {
            Name: response.data.RestaurantProfile.name,
            Email: response.data.RestaurantProfile.emailID,
            Country: response.data.RestaurantProfile.country,
            StateName: response.data.RestaurantProfile.state,
            City: response.data.RestaurantProfile.city,
            Street: response.data.RestaurantProfile.streetAddress,
            Zip: response.data.RestaurantProfile.zip,
            Contact: response.data.RestaurantProfile.contact,
            Opening_Time: response.data.RestaurantProfile.Opening_Time,
            Closing_Time: response.data.RestaurantProfile.Closing_Time,
            CurbsidePickup: response.data.RestaurantProfile.Curbside_Pickup,
            DineIn: response.data.RestaurantProfile.Dine_In,
            YelpDelivery: response.data.RestaurantProfile.Yelp_Delivery,
            isFormDisable: true,
          };

          this.props.updateRestaurantInfo(payload);
          payload = {
            Name: response.data.name,
          };

          this.props.updateNameInfo(payload);

          this.setState({
            Name: this.props.restaurantData.Name,
            Email: this.props.restaurantData.Email,
            Country: this.props.restaurantData.Country,
            StateName: this.props.restaurantData.StateName,
            City: this.props.restaurantData.City,
            Street: this.props.restaurantData.Street,
            Zip: this.props.restaurantData.Zip,
            Contact: this.props.restaurantData.Contact,
            Opening_Time: this.props.restaurantData.Opening_Time,
            Closing_Time: this.props.restaurantData.Closing_Time,
            ImageUrl: this.props.restaurantData.ImageUrl,
            CurbsidePickup: this.props.restaurantData.CurbsidePickup,
            DineIn: this.props.restaurantData.DineIn,
            YelpDelivery: this.props.restaurantData.YelpDelivery,
            isFormDisable: true,
          });
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  }

  editProfile = () => {
    if (this.state.isFormDisable) {
      let tempEditProfile = {
        Name: this.props.restaurantData.Name,
        Email: this.props.restaurantData.Email,
        Country: this.props.restaurantData.Country,
        StateName: this.props.restaurantData.StateName,
        City: this.props.restaurantData.City,
        Zip: this.props.restaurantData.Zip,
        Street: this.props.restaurantData.Street,
        Contact: this.props.restaurantData.Contact,
        Country: this.props.restaurantData.Country,
        ImageUrl: this.props.restaurantData.ImageUrl,
        Opening_Time: this.props.restaurantData.Opening_Time,
        Closing_Time: this.props.restaurantData.Closing_Time,
        CurbsidePickup: this.props.restaurantData.CurbsidePickup,
        DineIn: this.props.restaurantData.DineIn,
        YelpDelivery: this.state.YelpDelivery,
      };
      this.setState({
        isFormDisable: !this.state.isFormDisable,
        submitError: false,
        tmpEditProfile: tempEditProfile,
      });
    } else {
      let initialData = this.state.tmpEditProfile;
      let tmpEditProfile = {
        Name: '',
        Email: '',
        Country: '',
        StateName: '',
        City: '',
        Zip: '',
        Street: '',
        Contact: '',
        Country: '',
        Opening_Time: '',
        Closing_Time: '',
        CurbsidePickup: false,
        DineIn: false,
        YelpDelivery: false,
        ImageUrl: '',
      };
      this.setState({
        tmpEditProfile,
        isFormDisable: !this.state.isFormDisable,

        submitError: false,
      });
      this.props.updateRestaurantInfo(initialData);
    }
  };

  onChangeHandlerName = (e) => {
    this.setState({
      submitError: false,
    });
    let payload = {
      Name: e.target.value,
    };
    this.props.updateNameInfo(payload);
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerEmail = (e) => {
    this.setState({
      submitError: false,
    });

    let payload = {
      Email: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerPhoneNo = (e) => {
    this.setState({
      submitError: false,
    });
    let payload = {
      Contact: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerState = (e) => {
    this.setState({
      submitError: false,
    });

    let payload = {
      StateName: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerZipCode = (e) => {
    this.setState({
      Zip: e.target.value,
      submitError: false,
    });
    let payload = {
      Zip: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerCity = (e) => {
    this.setState({
      City: e.target.value,
      submitError: false,
    });
    let payload = {
      City: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerCountry = (e) => {
    this.setState({
      submitError: false,
    });
    let payload = {
      Country: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerStreet = (e) => {
    this.setState({
      submitError: false,
    });
    let payload = {
      Street: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerOpeningTime = (e) => {
    this.setState({
      submitError: false,
    });
    let payload = {
      Opening_Time: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerClosingTime = (e) => {
    this.setState({
      submitError: false,
    });
    let payload = {
      Closing_Time: e.target.value,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerYelpDelivery = () => {
    this.setState({
      submitError: false,
    });

    let payload = {
      YelpDelivery: !this.props.restaurantData.YelpDelivery,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerCurbsidePickup = () => {
    let payload = {
      CurbsidePickup: !this.props.restaurantData.CurbsidePickup,
    };
    this.props.updateRestaurantInfo(payload);
  };

  onChangeHandlerDineIn = () => {
    let payload = {
      DineIn: !this.props.restaurantData.DineIn,
    };
    this.props.updateRestaurantInfo(payload);
  };

  ValidityUpdateProfile = () => {
    let ErrorStr = '';
    if (this.state.Name.length == 0) {
      ErrorStr = ErrorStr + 'Name cannot be Empty';
    }

    if (this.state.City.length === 0) {
      if (ErrorStr) {
        ErrorStr += ', ';
      }
      ErrorStr = ErrorStr + 'City cannot be empty';
    }

    if (!/^\d+$/.test(this.state.Zip)) {
      if (ErrorStr) {
        ErrorStr += ', ';
      }
      ErrorStr = ErrorStr + 'Validate Zip Code';
    }

    if (!/^\d+$/.test(this.state.Contact)) {
      if (ErrorStr) {
        ErrorStr += ', ';
      }
      ErrorStr = ErrorStr + 'Validate Phone Number';
    }

    if (ErrorStr.length == 0) {
      ErrorStr = 'Correct';
    }
    return ErrorStr;
  };

  onSubmitUpdateProfile = (e) => {
    const validateCheck = this.ValidityUpdateProfile();

    if (validateCheck === 'Correct') {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        Name: this.props.restaurantData.Name,
        Country: this.props.restaurantData.Country,
        StateName: this.props.restaurantData.StateName,
        City: this.props.restaurantData.City,
        Zip: this.props.restaurantData.Zip,
        Street: this.props.restaurantData.Street,
        Contact: this.props.restaurantData.Contact,
        Opening_Time: this.props.restaurantData.Opening_Time,
        Closing_Time: this.props.restaurantData.Closing_Time,
        CurbsidePickup: this.props.restaurantData.CurbsidePickup,
        DineIn: this.props.restaurantData.DineIn,
        YelpDelivery: this.props.restaurantData.YelpDelivery,
        ImageURL: this.props.restaurantData.ImageUrl,
        token: localStorage.getItem('token'),
        user_id: localStorage.getItem('user_id'),
      };
      // set the with credentials to true
      // axios.defaults.withCredentials = true;
      // // make a post request with the user data
      // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      // axios.post(serverUrl + 'restaurant/updateRestProfile', data)
      this.props.client
        .mutate({
          mutation: updateRestProfile,
          variables: {
            ID: localStorage.getItem('RestaurantID'),
            name: this.props.restaurantData.Name,
            contact: this.props.restaurantData.Contact,
            streetAddress: this.props.restaurantData.Street,
            city: this.props.restaurantData.City,
            state: this.props.restaurantData.StateName,
            country: this.props.restaurantData.Country,
            zip: this.props.restaurantData.Zip,
            Opening_Time: this.props.restaurantData.Opening_Time,
            Closing_Time: this.props.restaurantData.Closing_Time,
            Curbside_Pickup: this.props.restaurantData.CurbsidePickup,
            Dine_In: this.props.restaurantData.DineIn,
            Yelp_Delivery: this.props.restaurantData.YelpDelivery,
          },
        })
        .then(
          (response) => {
            console.log('Status Code : ', response.status);
            if (response.data.updateRestProfile.Result === 'Updated Restaurant Profile') {
              localStorage.setItem('Name', this.props.restaurantData.Name);
              console.log('Profile Updated');
              this.setState({
                isFormDisable: true,
                submitError: false,
              });
            }
          },
          (error) => {
            this.setState({
              submitErrorBlock: error.response.data,
              submitError: false,
            });
          }
        );
    } else {
      this.setState({
        submitErrorBlock: validateCheck,
        submitError: true,
      });
    }
  };

  render(/**<fieldset disabled> */) {
    let errorClass = 'alert alert-error ';
    const defaultImage =
      'https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png';
    if (!this.state.submitError) {
      errorClass += 'hidden';
    }
    return (
      <div style={{ marginTop: '3%' }}>
        <h2> Welcome {this.props.restaurantData.Name}</h2>
        {/* <h2> {JSON.stringify(this.props)}</h2> */}
        <div class={errorClass}>
          <a onClick={this.removeError} class="js-alert-dismiss dismiss-link" href="#">
            ×
          </a>
          <p class="alert-message">
            <ul>{this.state.submitErrorBlock}</ul>
          </p>
        </div>
        <form
          onSubmit={this.onSubmitUpdateProfile}
          class="yform signup-form  city-hidden"
          id="signup-form"
        >
          <fieldset disabled={this.state.isFormDisable && 'disabled'}>
            {/* <h4>
              Your Profile Photo
              <strong>
                <a href="/#">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.onChangeFileHandler}
                    name="fileName"
                    id="filename"
                    multiple
                  />
                </a>
              </strong>
            </h4> */}
            {/* <div class="photo-box pb-m">
              <a
                class="js-analytics-click"
                data-analytics-label="user-photo"
                href="/user_photos?return_url=%2Fprofile%3Freturn_url%3D%252Fuser_details%253Fuserid%253DSbr_JFt86Dss0N-hb9StQg"
              >
                <img
                  style={{ width: '150px', height: '120px' }}
                  alt=""
                  class="photo-box-img"
                  src={
                    this.props.restaurantData.ImageUrl !== undefined
                      ? this.props.restaurantData.ImageUrl
                      : defaultImage
                  }
                  // src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"
                />
              </a>
            </div> */}
            <div class="js-password-meter-container">
              <ul>
                <li style={{ width: '40%' }}>
                  <label class="placeholder-sub">Restaurant Name</label>
                  <input
                    id="Name"
                    name="Name"
                    placeholder="Name"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerName}
                    value={this.props.restaurantData.Name}
                  />
                </li>
              </ul>
              <fieldset class="login-separator hr-line">
                <legend align="left">Contact Information</legend>
              </fieldset>
              <ul class="inline-layout clearfix">
                <li style={{ width: '40%' }}>
                  <label class="placeholder-sub">Email</label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    required="required"
                    type="email"
                    // onChange={this.onChangeHandlerEmail}
                    value={this.props.restaurantData.Email}
                    disabled="disabled"
                  />
                </li>

                <li style={{ width: '40%' }}>
                  <label class="placeholder-sub">Phone-No</label>
                  <input
                    id="Contact"
                    name="Contact"
                    placeholder="Contact"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerPhoneNo}
                    value={this.props.restaurantData.Contact}
                    minlength="10"
                    maxlength="10"
                  />
                </li>
              </ul>
            </div>
            <fieldset class="login-separator hr-line">
              <legend align="left">Address</legend>
            </fieldset>
            <div class="js-more-fields more-fields">
              <ul class="inline-layout clearfix">
                <li style={{ width: '30%' }}>
                  <label class="placeholder-sub">Country</label>
                  <input
                    id="Country"
                    name="Country"
                    placeholder="Countryt"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerCountry}
                    value={this.props.restaurantData.Country}
                    disabled="disabled"
                  />
                </li>
                <li style={{ width: '5%' }}></li>
                <li style={{ width: '30%' }}>
                  <label class="placeholder-sub">State</label>
                  <select
                    placeholder="State"
                    className="form-control"
                    onChange={this.onChangeHandlerState}
                    value={this.props.restaurantData.StateName}
                    required
                  >
                    {this.props.staticData.stateNames.map((states) => (
                      <option className="Dropdown-menu" key={states.key} value={states.value}>
                        {states.value}
                      </option>
                    ))}
                  </select>
                </li>
                <li style={{ width: '5%' }}></li>
                <li style={{ width: '30%' }}>
                  <label class="placeholder-sub">Zip Code</label>
                  <input
                    minlength="5"
                    maxlength="5"
                    id="Zip"
                    name="Zip"
                    placeholder="Zip Code"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerZipCode}
                    value={this.props.restaurantData.Zip}
                  />
                </li>
                <li style={{ width: '30%' }}>
                  <label class="placeholder-sub">City</label>
                  <input
                    id="city"
                    name="City"
                    placeholder="City"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerCity}
                    value={this.props.restaurantData.City}
                  />
                </li>
                <li style={{ width: '70%' }}>
                  <label class="placeholder-sub">Street</label>
                  <input
                    id="street"
                    name="street"
                    placeholder="Street"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerStreet}
                    value={this.props.restaurantData.Street}
                  />
                </li>
              </ul>
              <fieldset class="login-separator hr-line">
                <legend align="left">Business Information</legend>
              </fieldset>
              <ul class="inline-layout clearfix">
                <li style={{ width: '30%' }}>
                  <label class="">Curbside Pickup</label>
                  <input
                    style={{ width: '20px', height: '20px' }}
                    name="isGoing"
                    type="checkbox"
                    checked={this.props.restaurantData.CurbsidePickup}
                    onChange={this.onChangeHandlerCurbsidePickup}
                  />
                </li>
                <li style={{ width: '30%' }}>
                  <label class="">Dine In</label>
                  <input
                    style={{ width: '20px', height: '20px' }}
                    name="isGoing"
                    type="checkbox"
                    checked={this.props.restaurantData.DineIn}
                    onChange={this.onChangeHandlerDineIn}
                  />
                </li>
                <li style={{ width: '30%' }}>
                  <label class="">Yelp Delivery</label>
                  <input
                    style={{ width: '20px', height: '20px' }}
                    name="isGoing"
                    type="checkbox"
                    checked={this.props.restaurantData.YelpDelivery}
                    onChange={this.onChangeHandlerYelpDelivery}
                  />
                </li>
              </ul>
              <fieldset class="login-separator hr-line">
                <legend align="left">Business Hours</legend>
              </fieldset>
              <ul class="inline-layout clearfix">
                <li style={{ width: '40%' }}>
                  <label class="">Opening Time</label>
                  <input
                    type="time"
                    step="1"
                    value={this.state.time}
                    className="form-control"
                    placeholder="Time"
                    onChange={this.onChangeHandlerOpeningTime}
                    value={this.props.restaurantData.Opening_Time}
                  />
                </li>
                <li style={{ width: '40%' }}>
                  <label class="">Closing Time</label>
                  <input
                    type="time"
                    step="1"
                    value={this.state.time}
                    className="form-control"
                    placeholder="Time"
                    onChange={this.onChangeHandlerClosingTime}
                    value={this.props.restaurantData.Closing_Time}
                  />
                </li>
              </ul>
            </div>
            {!this.state.isFormDisable && (
              <div>
                <button
                  id="signup-button"
                  type="submit"
                  class="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
                  style={{
                    marginTop: '2%',
                    marginLeft: '40%',
                  }}
                >
                  <span>Save</span>
                </button>

                <button
                  class="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
                  style={{
                    marginTop: '2%',
                    marginLeft: '2%',
                  }}
                  onClick={this.editProfile}
                >
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </fieldset>
        </form>
        {this.state.isFormDisable && (
          <button
            class="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
            style={{
              marginTop: '2%',
              marginLeft: '45%',
            }}
            onClick={this.editProfile}
          >
            <span>Edit</span>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { staticData } = state.staticDataReducer;
  const { restaurantData } = state.restaurantDataReducer;
  return {
    Name: state.nameInfo.name,
    staticData: staticData,
    restaurantData: restaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNameInfo: (payload) => {
      dispatch({
        type: 'update-name-field',
        payload,
      });
    },
    updateRestaurantInfo: (payload) => {
      dispatch({
        type: 'update-restaurant-info',
        payload,
      });
    },
  };
};

export default compose(
  withApollo,
  graphql(restaurantProfileQuery, { name: 'restaurantProfileQuery' }),
  graphql(updateRestProfile, { name: 'updateRestProfile' }),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
