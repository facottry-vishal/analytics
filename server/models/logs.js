import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    projectID: {
      type: String,
      required: true,
    },

    filter: {
      type: Object,
      default: {},
    },

    pathnames: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model.logs || mongoose.model("log", logSchema);
