const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    company: {
      type: String,
      enum: {
        values: ["adidas", "nike", "vans"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: "#FFFFFF",
    },
    image: {
      type: String,
      default: "/uploads/example.jpg",
    },
    featured: {
      type: Boolean,
      deafult: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    category: {
      type: String,
      enum: {
        values: ["running", "outdoor", "lifestyle", "sports", "causal"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
