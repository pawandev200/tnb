import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectTitle: {
    type: String,
    required: [true, "Project title is required"],
  },
  projectDescription: {
    type: String,
    required: [true, "Project description is required"],
  },
  projectLink: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  projectDate: {
    type: Date,
    required: [true, "Project date is required"],
  },
  skills: [
    {
      type: String,
      required: [true, "At least one skill is required"],
    },
  ],
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Image public ID is required"],
      },
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
