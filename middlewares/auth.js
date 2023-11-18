import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.lenght).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
