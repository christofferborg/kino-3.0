import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "hemlig_demo_nyckel";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Ingen token angiven" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Ogiltig token" });
  }
}
