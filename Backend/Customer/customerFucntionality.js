const bcrypt = require('bcrypt');
const Customer = require('../models/CustomerModel');
const Login = require('../models/LoginModel');

const custSignup = async (req) => {
  const res = {};

  const customer = await Login.findOne({ emailID: req.emailID, Role: 'Customer' });
  if (customer) {
    res.Result = 'EmailID already in use';
  } else {
    const Password = await bcrypt.hash(req.Password, 10);
    const login = new Login({
      ...req,
      Password,
      Role: 'Customer',
    });
    const customerLogin = await login.save();

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    const customerModelData = new Customer({
      ...req,
      // eslint-disable-next-line no-underscore-dangle
      CustomerID: customerLogin._id,
      YelpingSince: today,
    });
    // eslint-disable-next-line no-unused-vars
    await customerModelData.save();
    res.Result = 'Successfully Created';
  }
  return res;
};

const fetchCustomerProfile = async (req) => {
  let res = null;
  const CustomerID = req.id;
  await Customer.findOne({ CustomerID }, (error, result) => {
    if (error) {
      //   res.writeHead(500, {
      //     'Content-Type': 'text/plain',
      //   });
      //   res.end(JSON.stringify('Network Error'));
    } else {
      //   res.writeHead(200, {
      //     'Content-Type': 'text/plain',
      //   });
      res = result;
    }
  });
  return res;
};

module.exports = {
  fetchCustomerProfile,
  custSignup,
};
