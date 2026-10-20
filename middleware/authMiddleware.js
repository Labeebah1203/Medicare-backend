import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("protect running");

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorised" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Token error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
