import mongoose from "mongoose";

const filterCountSchema = new mongoose.Schema(
  {
    projectID: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      default: "PROD",
      enum: ["PROD", "UAT", "DEV", "TEST"],
    },

    companyID: {
      type: String,
      required: true,
    },

    filterCount: {
      type: Object,
      default: {},
    }
  },
  { timestamps: true }
);

export default mongoose.model.filtercounts ||
  mongoose.model("filtercount", filterCountSchema);