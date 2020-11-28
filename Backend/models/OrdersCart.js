const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersCartSchema = new Schema(
  {
    OrderID: { type: String, required: true },
    Dishname: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    TotalPrice: { type: Number, required: true },
    RestaurantID: { type: String, required: true },
    CustomerID: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const ordersCartModel = mongoose.model('orderCart', ordersCartSchema);
module.exports = ordersCartModel;
