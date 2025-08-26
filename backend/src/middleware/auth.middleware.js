import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token does not exist" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is invalid" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User does not exist" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
