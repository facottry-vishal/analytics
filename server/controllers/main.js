import axios from "axios";

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

// NOT IMPLEMENTED
export const getCount = async (req, res) => {
  try {
    const backendURL = process.env.MAIN_SERVER_URL;
    const { filters } = req.body;  // Assuming filters are sent in the request body

    const backendResponse = await axios.post(backendURL + "/data/get-count", { filters }, {
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
export const updateCount = async (req, res) => {
  try {
    return res.status(200).json({ message: "NOT IMPLEMENTED" });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const getLogs = async (req, res) => {
  try {
    return res.status(200).json({ message: "NOT IMPLEMENTED" });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const updateLogs = async (req, res) => {
  try {
    return res.status(200).json({ message: "NOT IMPLEMENTED" });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
