import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import OrderForCustomer from './OrderForCustomer';
import axios from 'axios';
import serverUrl from '../../config';
import OrderDetails from '../Orders/OrderDetails';
import { connect } from 'react-redux';
import { graphql, Query, withApollo } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { custSearchOrderFilterQuery } from '../../query/query';

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popSeen: false,
    };
  }

  componentDidMount = async () => {
    let payload = {
      filter1: 'All',
      filter2: 'Order Received',
      sortOrder: -1,
    };
    await this.props.updateOrderHistory(payload);
    this.fetchOrders();
  };

  fetchOrders = (pageNo = 0) => {
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // axios
    //   .get(
    //     serverUrl + 'customer/fetchAllOrders',

    //     {
    //       params: {
    //         CustomerID: localStorage.getItem('user_id'),
    //         filter1: this.props.orderHistory.filter1,
    //         filter2: this.props.orderHistory.filter2,
    //         sortOrder: this.props.orderHistory.sortOrder,
    //         pageNo,
    //       },
    //       withCredentials: true,
    //     }
    //   )
    this.props.client
      .query({
        query: custSearchOrderFilterQuery,
        variables: {
          CustomerID: localStorage.getItem('CustomerID'),
          filter1: this.props.orderHistory.filter1,
          filter2: this.props.orderHistory.filter2,
          sortOrder: this.props.orderHistory.sortOrder,
        },
        fetchPolicy: 'network-only',
      })
      .then(
        (response) => {
          console.log(response.data.CustSearchOrderFilter.OrderSearchList);
          let allOrders = response.data.CustSearchOrderFilter.OrderSearchList.map((order) => {
            return {
              RestaurantID: order.RestaurantID,
              RestaurantName: order.RestaurantName,
              ID: order._id,
              Bill: order.Bill,
              DeliverStatusValue: order.Status,
              OrderedTime: new Date(parseInt(order.Date)),
              OrderType: order.DeliveryMode,
              orders: order.OrderCartType,
            };
          });

          let payload = {
            orderDetails: allOrders,
            // PageCount: response.data[1],
            // TotalCount: response.data[2],
            // PageNo: pageNo,
          };
          this.props.updateOrderHistory(payload);
        },
        (error) => {}
      );
  };

  fetchOrdersFilter1 = async (event, filter1) => {
    let payload = {
      filter1,
    };
    await this.props.updateOrderHistory(payload);
    this.fetchOrders();
  };

  fetchOrdersFilter2 = async (event, filter2) => {
    let payload = {
      filter2,
    };
    await this.props.updateOrderHistory(payload);
    this.fetchOrders();
  };

  setSortOrder = async (event, sortOrder) => {
    let payload = {
      sortOrder,
    };
    await this.props.updateOrderHistory(payload);
    this.fetchOrders();
  };

  // handlePageClick = (e) => {
  //   this.fetchOrders(e.selected);
  // }
  openOrderDetails = (orderID, restaurantID) => {
    if (this.state.popSeen) {
      this.setState({
        popSeen: !this.state.popSeen,
      });
    } else {
      let index = this.props.orderHistory.orderDetails.findIndex(
        (x) => x.ID === orderID && x.RestaurantID === restaurantID
      );
      let allItems = this.props.orderHistory.orderDetails[index].orders.map((order) => {
        return {
          first: order.Dishname,
          count: order.Quantity,
          price: order.Price,
          totalPrice: order.TotalPrice,
        };
      });

      this.setState({
        popSeen: !this.state.popSeen,
      });
      let payload = {
        custOrder: allItems,
      };
      this.props.updateOrderHistory(payload);
    }
  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem('role')) {
      console.log('Role not found');
      redirectVar = <Redirect to="/customerLogin" />;
    } else {
      if (localStorage.getItem('role') === 'Customer') {
        redirectVar = null;
      } else if (localStorage.getItem('role') === 'Restaurant') {
        redirectVar = <Redirect to="/restaurantProfile" />;
      } else {
        redirectVar = <Redirect to="/customerLogin" />;
      }
    }
    return (
      <div style={{ background: 'white' }}>
        {' '}
        {/*this.props.snackbarData != null && <SnackBar />*/}
        {redirectVar}
        {/* {<CustomerNavBar />} */}
        <span id="page-content" class="offscreen">
          &nbsp;
        </span>
        {/* <div className="main-content-wrap main-content-wrap--full">{<GreyArea />}</div> */}
        <div
          className="super-container"
          style={{
            paddingTop: '15px',
            paddingBottom: '36px',
            width: '960px',
            margin: '0 auto',
            padding: '0 15px',
          }}
        >
          <div
            style={{ marginTop: '40px' }}
            className="clearfix layout-block layout-n user-details_container"
          >
            {/* {<LeftPannel />} */}
            <div className="column column-beta ">
              <div className="user-details-overview">
                <div class="user-details-overview_sidebar">
                  <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                      {/*<div class="navbar-header">
                        <a class="navbar-brand">Filter By</a>
        </div>*/}
                      <ul class="nav navbar-nav">
                        <li className={this.state.filter1 === 'All' && 'active'}>
                          <Link to="#" onClick={(event) => this.fetchOrdersFilter1(event, 'All')}>
                            All Orders
                          </Link>
                        </li>
                        <li className={this.state.filter1 === 'Delivery' && 'active'}>
                          <Link
                            to="#"
                            onClick={(event) => this.fetchOrdersFilter1(event, 'Delivery')}
                          >
                            Delivery Type
                          </Link>
                        </li>
                        <li className={this.state.filter1 === 'Pickup' && 'active'}>
                          <Link
                            to="#"
                            onClick={(event) => this.fetchOrdersFilter1(event, 'Pickup')}
                          >
                            Pickup Type
                          </Link>
                        </li>
                      </ul>

                      <ul class="nav navbar-nav navbar-right">
                        <li>
                          <Link to="#" onClick={(event) => this.setSortOrder(event, -1)}>
                            <span class="glyphicon glyphicon-arrow-down"></span>
                            Descending
                          </Link>
                        </li>
                        <li>
                          <Link to="#" onClick={(event) => this.setSortOrder(event, 1)}>
                            <span class="glyphicon glyphicon-arrow-up"></span>
                            Ascending
                          </Link>
                        </li>
                      </ul>
                      <ul class="nav navbar-nav">
                        {(this.props.orderHistory.filter1 === 'Pickup' ||
                          this.props.orderHistory.filter1 === 'Delivery') && (
                          <li
                            className={
                              this.props.orderHistory.filter2 === 'Order Received' && 'active'
                            }
                          >
                            <Link
                              to="#"
                              onClick={(event) => this.fetchOrdersFilter2(event, 'Order Received')}
                            >
                              Received
                            </Link>
                          </li>
                        )}
                        {(this.props.orderHistory.filter1 === 'Pickup' ||
                          this.props.orderHistory.filter1 === 'Delivery') && (
                          <li
                            className={this.props.orderHistory.filter2 === 'Preparing' && 'active'}
                          >
                            <Link
                              to="#"
                              onClick={(event) => this.fetchOrdersFilter2(event, 'Preparing')}
                            >
                              Preparing
                            </Link>
                          </li>
                        )}
                        {this.props.orderHistory.filter1 === 'Delivery' && (
                          <li
                            className={this.props.orderHistory.filter2 === 'On the way' && 'active'}
                          >
                            <Link
                              to="#"
                              onClick={(event) => this.fetchOrdersFilter2(event, 'On the way')}
                            >
                              On The Way
                            </Link>
                          </li>
                        )}
                        {this.props.orderHistory.filter1 === 'Delivery' && (
                          <li
                            className={this.props.orderHistory.filter2 === 'Delivered' && 'active'}
                          >
                            <Link
                              to="#"
                              onClick={(event) => this.fetchOrdersFilter2(event, 'Delivered')}
                            >
                              Delivered
                            </Link>
                          </li>
                        )}
                        {this.props.orderHistory.filter1 === 'Pickup' && (
                          <li
                            className={
                              this.props.orderHistory.filter2 === 'Pick up Ready' && 'active'
                            }
                          >
                            <Link
                              to="#"
                              onClick={(event) => this.fetchOrdersFilter2(event, 'Pick up Ready')}
                            >
                              Pickup Ready
                            </Link>
                          </li>
                        )}
                        {this.props.orderHistory.filter1 === 'Pickup' && (
                          <li
                            className={this.props.orderHistory.filter2 === 'Picked up' && 'active'}
                          >
                            <Link
                              to="#"
                              onClick={(event) => this.fetchOrdersFilter2(event, 'Picked up')}
                            >
                              Picked up
                            </Link>
                          </li>
                        )}
                      </ul>

                      {/*navLogin*/}
                    </div>
                  </nav>
                  {this.state.popSeen ? (
                    <OrderDetails
                      modeTop={'20%'}
                      orderDetails={this.props.orderHistory.custOrder}
                      toggle={this.openOrderDetails}
                    />
                  ) : null}
                  <ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                    {this.props.orderHistory.orderDetails.map((order) => (
                      <OrderForCustomer
                        order={order}
                        openOrderDetails={() => this.openOrderDetails(order.ID, order.RestaurantID)}
                      />
                    ))}
                  </ul>
                  {/* <ReactPaginate
                      previousLabel={'prev'}
                      nextLabel={'next'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={this.props.orderHistory.PageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      forcePage={this.props.orderHistory.PageNo}
                      activeClassName={'active'}
                  /> */}
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderHistory: (payload) => {
      dispatch({
        type: 'update-order-history',
        payload,
      });
    },
  };
};

const mapStateToProps = (state) => {
  const { orderHistory } = state.orderHistoryReducer;
  return {
    orderHistory: orderHistory,
  };
};

export default compose(
  withApollo,
  graphql(custSearchOrderFilterQuery, { name: 'custSearchOrderFilterQuery' }),
  connect(mapStateToProps, mapDispatchToProps)
)(OrdersList);
