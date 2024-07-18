import logs from "../models/logs.js";

export const updateLogs = async (req, res) => {
  try {
    const { projectID, filter, pathname } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // UPDATE LOG COLLECTION
    const log = await logs.findOne({
      projectID,
      filter,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    if (log) {
      log.pathnames.push(pathname);
      log.count = log.count + 1;
      await log.save();
      return res.status(200).json({ message: "Log updated successfully" });
    }

    const newLogDoc = new logs({
      projectID,
      filter,
      pathnames: [pathname],
      count: 1,
    });
    await newLogDoc.save();
    return res.status(200).json({ message: "Log created successfully" });
  } catch (error) {
    console.log("Error updating logs: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
