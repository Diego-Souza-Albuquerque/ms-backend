import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(403).send("Acesso negado"); //sem token
  }

  /*  if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.lenght).trimLeft();
    } */

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: user_id };

    return next();
  } catch (err) {
    res.status(401).send("Token inválido");
  }
};
