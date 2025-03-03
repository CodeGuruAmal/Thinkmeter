import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized access" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode) {
      res.status(401).json({ status: false, message: "Unauthorized access" });
    } else {
      req.body.userId = tokenDecode.id;
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
