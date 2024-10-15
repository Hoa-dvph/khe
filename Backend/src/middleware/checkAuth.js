import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
export const checkAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token); // Log token
    console.log("JWT Secret:", process.env.JWT_SECRET); // Kiểm tra secret

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456"); // Sử dụng secret
        console.log("Decoded Token:", decoded);

        // Sử dụng decoded.userId thay vì decoded.id
        const user = await User.findById(decoded.userId);
        if (!user) {
          console.log("User not found");
          return res.status(StatusCodes.UNAUTHORIZED).json({
            messages: ["Người dùng không tồn tại"],
          });
        }

        req.user = user;
        console.log("Authenticated user:", req.user);
        next();
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          messages: ["Token không tồn tại"],
        });
      }
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        messages: ["Không được phép, token không hợp lệ"],
      });
    }
  } else {
    console.log("No token attached to header");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      messages: ["Không có token trong header"],
    });
  }
});

// Middleware kiểm tra quyền admin
export const checkAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      messages: ["Người dùng chưa xác thực"],
    });
  }

  // Kiểm tra quyền admin
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.FORBIDDEN).json({
      messages: ["Bạn không phải là admin"],
    });
  }

  next();
});
