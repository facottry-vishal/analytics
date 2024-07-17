import logs from "../models/logs.js";
import count from "../models/count.js";

export const updateLogs = async (req, res) => {
  try {
    const { projectID, filter, pathname } = req.body;

    // UPDATE COUNT COLLECTION
    const countDoc = await count.findOne({ projectID });
    if (countDoc) {
      const filterCountObj = countDoc.count;

      Object.values(filter).forEach((key) => {
        if (filterCountObj[key]) {
          filterCountObj[key] += 1;
        } else {
          filterCountObj[key] = 1;
        }
      });
      
      countDoc.markModified("count");
      await countDoc.save();
    } else {
      const filterCountObj = {};

      Object.values(filter).forEach((key) => {
        filterCountObj[key] = 1;
      });

      const newDoc = new count({ projectID, count: filterCountObj });
      await newDoc.save();
    }

    // UPDATE LOG COLLECTION
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const log = await logs.findOne({
      projectID,
      filter,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    if (log) {
      log.pathnames.push(pathname);
      await log.save();
      return res.status(200).json({ message: "Log updated successfully" });
    }

    const newDoc = new logs({ projectID, filter, pathnames: [pathname] });
    await newDoc.save();
    return res.status(200).json({ message: "Log created successfully" });
  } catch (error) {
    console.log("Error updating logs: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
