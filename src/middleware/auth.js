import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "demo_secret";

export function verifyToken(req, res, next) {
  console.log("verifyToken körs", req.headers.authorization);
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ success: false, error: "Token saknas" });

  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ success: false, error: "Token saknas" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ success: false, error: "Ogiltig token" });
    req.user = user;
    next();

  });
}