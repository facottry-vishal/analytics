import axios from "axios";
import logs from "../models/logs.js";

export const isAuth = async (req, res, next) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;
    await axios.get(backendURL + "/auth", {
      headers: {
        Authorization: req.headers.authorization,
        Cookie: req.headers.cookie,
      },
    });

    next();
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;

    const backendResponse = await axios.post(
      backendURL + "/auth/login",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
          Cookie: req.headers.cookie,
        },
      }
    );

    // Forward only necessary headers
    const headersToForward = ["content-type", "authorization", "set-cookie"];
    headersToForward.forEach((header) => {
      if (backendResponse.headers[header]) {
        res.setHeader(header, backendResponse.headers[header]);
      }
    });

    // Forward the status and data from backendResponse to the client
    return res.status(backendResponse.status).send(backendResponse.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  }
};

export const logoutUser = async (req, res) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;

    const backendResponse = await axios.get(backendURL + "/auth/logout", {
      headers: {
        Authorization: req.headers.authorization,
        Cookie: req.headers.cookie,
      },
    });

    // Forward only necessary headers
    const headersToForward = ["content-type", "authorization", "set-cookie"];
    headersToForward.forEach((header) => {
      if (backendResponse.headers[header]) {
        res.setHeader(header, backendResponse.headers[header]);
      }
    });

    // Forward the status and data from backendResponse to the client
    return res.status(backendResponse.status).send(backendResponse.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  }
};

export const getAdmin = async (req, res) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;

    const backendResponse = await axios.get(backendURL + "/admin/get-admin", {
      headers: {
        Authorization: req.headers.authorization,
        Cookie: req.headers.cookie,
      },
    });

    // Forward only necessary headers
    const headersToForward = ["content-type", "authorization", "set-cookie"];
    headersToForward.forEach((header) => {
      if (backendResponse.headers[header]) {
        res.setHeader(header, backendResponse.headers[header]);
      }
    });

    // Forward the status and data from backendResponse to the client
    return res.status(backendResponse.status).send(backendResponse.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  }
};

export const getUser = async (req, res) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;

    const backendResponse = await axios.get(backendURL + "/auth/get-user", {
      headers: {
        Authorization: req.headers.authorization,
        Cookie: req.headers.cookie,
      },
    });

    // Forward only necessary headers
    const headersToForward = ["content-type", "authorization", "set-cookie"];
    headersToForward.forEach((header) => {
      if (backendResponse.headers[header]) {
        res.setHeader(header, backendResponse.headers[header]);
      }
    });

    // Forward the status and data from backendResponse to the client
    return res.status(backendResponse.status).send(backendResponse.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  }
};

// GET COUNT OF FILTER VALUES
export const getCount = async (req, res) => {
  try {
    const { projectID, filter } = req.body;
    const { startDate, endDate, ...mainFilter } = filter;

    switch (true) {
      case !projectID:
        return res.status(400).json({ message: "PROJECT ID NOT PROVIDED" });
      case !mainFilter:
        return res.status(400).json({ message: "FILTER NOT PROVIDED" });
    }

    let searchFilter = {};
    for (const key in mainFilter) {
      searchFilter[key] = mainFilter[key].split(",");
    }

    let filterConditions = Object.entries(searchFilter).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          return acc.flatMap((obj) =>
            value.map((val) => ({ ...obj, [key]: val }))
          );
        } else {
          return acc.map((obj) => ({ ...obj, [key]: value }));
        }
      },
      [{}]
    );

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);

    const pipeline = [
      {
        $match: {
          projectID,
          createdAt: { $gte: startDateObj, $lte: endDateObj },
          $or: filterConditions.map((condition) => ({ filter: condition })),
        },
      },
      {
        $group: {
          _id: "$filter",
          count: { $sum: "$count" },
        },
      },
    ];

    const resObj = await logs.aggregate(pipeline).exec();

    console.log(resObj);

    const COUNT = {};
    resObj.forEach(({ _id, count }) => {
      for (const key in _id) {
        if (!COUNT[key]) {
          COUNT[key] = {};
        }
        if (!COUNT[key][_id[key]]) {
          COUNT[key][_id[key]] = 0;
        }
        COUNT[key][_id[key]] += count;
      }
    });

    return res.status(200).json({ message: "SUCCESS", data: COUNT, filter });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET LIST OF PATHNAMES
export const getLogs = async (req, res) => {
  try {
    const { projectID, filter, startDate, endDate } = req.body;

    switch (true) {
      case !projectID:
        return res.status(400).json({ message: "PROJECT ID NOT PROVIDED" });
      case !filter:
        return res.status(400).json({ message: "FILTER NOT PROVIDED" });
    }

    let searchFilter = {};
    for (const key in filter) {
      searchFilter[key] = filter[key].split(", ");
    }

    let filterConditions = Object.entries(searchFilter).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          return acc.flatMap((obj) =>
            value.map((val) => ({ ...obj, [key]: val }))
          );
        } else {
          return acc.map((obj) => ({ ...obj, [key]: value }));
        }
      },
      [{}]
    );

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);

    const pipeline = [
      {
        $match: {
          projectID,
          createdAt: { $gte: startDateObj, $lte: endDateObj },
          $or: filterConditions.map((condition) => ({ filter: condition })),
        },
      },
      {
        $group: {
          _id: "$filter",
          pathnames: { $addToSet: "$pathnames" },
        },
      },
    ];

    const resObj = await logs.aggregate(pipeline).exec();

    // Flatten the pathnames array
    resObj.forEach((obj) => {
      obj.pathnames = obj.pathnames.flat();
    });

    return res.status(200).json({ message: "SUCCESS", data: resObj });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET INDIVIDIAL LOG BY PATHNAME
export const getLogData = async (req, res) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;
    const backendResponse = await axios.get(backendURL + "/scale/get-log-by-id", {
      headers: {
      Authorization: req.headers.authorization,
      Cookie: req.headers.cookie,
      },
      params: {
      pathname: req.query.pathname
      }
    });

    // Forward only necessary headers
    const headersToForward = ["content-type", "authorization", "set-cookie"];
    headersToForward.forEach((header) => {
      if (backendResponse.headers[header]) {
        res.setHeader(header, backendResponse.headers[header]);
      }
    });

    // Forward the status and data from backendResponse to the client
    return res.status(backendResponse.status).send(backendResponse.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  }
};
