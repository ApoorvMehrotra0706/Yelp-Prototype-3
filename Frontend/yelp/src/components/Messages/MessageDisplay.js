import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { Name: '' };
  }
  // Call On render
  componentDidMount() {

    if (localStorage.getItem('role') === 'Restaurant') {
      this.setState({
        Name: this.props.message.CustomerName,
      });
    } else {
      this.setState({
        Name: this.props.message.RestaurantName,
      });
    }
  }

  
  render() {
    const text = 'Address:- ';
    return (
      <li className="lemon--li__373c0__1r9wz margin-b3__373c0__q1DuY padding-b3__373c0__342DA border--bottom__373c0__3qNtD border-color--default__373c0__3-ifU">
        <div class="lemon--div__373c0__1mboc review__373c0__13kpL sidebarActionsHoverTarget__373c0__2kfhE arrange__373c0__2C9bH gutter-2__373c0__1DiLQ grid__373c0__1Pz7f layout-stack-small__373c0__27wVp border-color--default__373c0__3-ifU">
          <div class="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-grid-column--8__373c0__2dUx_ border-color--default__373c0__3-ifU">
            <div class="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div class="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  class="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-fill__373c0__3Sfw1 border-color--default__373c0__3-ifU"
                  style={{ justifyContent: 'space-between', display: 'flex' }}
                >
                  <span class="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    <span style={{ marginRight: '20px' }}>
                      <img src={this.props.message.Image} style={{width: '100px', height: '100px'}}></img></span>
                    <span>
                      {/* Onelia D.*/}
                      {this.state.Name}  
                    </span>

                    {/* 8/22/2020*/}
                  </span>
                  <span class="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    <span style={{ marginLeft: '20px' }}>
                      Date: {this.props.message.Date.split('T')[0]}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div class="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  class="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-fill__373c0__3Sfw1 border-color--default__373c0__3-ifU"
                  style={{ justifyContent: 'space-between', display: 'flex' }}
                >
                  <span class="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                  </span>
                  <span class="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                  <button
                      onClick={(e) => this.props.openMessagesDetails(e, this.props.message.RestaurantID, this.props.message.CustomerID)}
                      data-ui="add-section"
                      aria-describedby="education_label"
                      class="_-_-shared-ui-atoms-button-base-___button__button _-_-shared-ui-atoms-button-base-___button__small _-_-shared-ui-atoms-button-secondary-___secondary__default "
                    >
                      ReadMessage
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const { yelpUsers } = state.yelpUsersReducer;
  const { customerData } = state.customerProfileReducer;
  return {
    yelpUsers: yelpUsers,
    customerData: customerData,
  };
};

export default connect(mapStateToProps, null)(MessageDisplay);
