import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {

    Ord_ID: { type: String, required: true, unique: true }, // Change type to String
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    

    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      balance: { type: Number }
    },

   
    bankDetails: {
      accName: { type: String },
      accNum: { type: String },
      transDate: { type: Date },
      bankName: { type: String },
      branchName: { type: String },
      transAmount: { type: Number },
      remarks: { type: String }
    },


    deliveryDetails: {
      agentName: { type: String },
      agentContact: { type: String },
      estDate: { type: Date },
      packSize: { type: String },
      trackNo: { type: String },
      trackLink: { type: String },
      delNote: { type: String }
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
  
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
