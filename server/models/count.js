import mongoose from "mongoose";

const countSchema = new mongoose.Schema(
  {
    projectID: {
      type: String,
      required: true,
    },

    count: {
      type: Object,
      default: {},
    }
  },
  { timestamps: true }
);

export default mongoose.model.counts ||
  mongoose.model("count", countSchema);