import bcryptjs from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Trường Email là bắt buộc",
    "string.empty": "Trường Email không được để trống",
    "string.email": "Trường Email phải là email hợp lệ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Trường Password là bắt buộc",
    "string.empty": "Trường Password không được để trống",
    "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
    "string.max": "Trường Password không được vượt quá {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Trường Confirm Password là bắt buộc",
    "any.only": "Mật khẩu không trùng khớp",
  }),
  name: Joi.string().required().messages({
    "any.required": "Trường Name là bắt buộc",
    "string.empty": "Trường Name không được để trống",
  }),
});

export const signup = async (req, res) => {
  const { email, password, name, avatar } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  console.log(error);
  if (error) {
    const messages = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages,
    });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Email đã tồn tại"],
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });

  return res.status(StatusCodes.CREATED).json({
    user,
  });
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Kiểm tra người dùng
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      messages: ["Email không tồn tại"],
    });
  }

  // So sánh mật khẩu
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Mật khẩu không chính xác"],
    });
  }

  // Tạo token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "123456",
    {
      expiresIn: "7d",
    }
  );

  return res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

//Lấy danh sách user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Không trả về password
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Đã xảy ra lỗi" });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, name, avatar } = req.body;

  try {
    // Find and update user by ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, name, avatar },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Người dùng không tồn tại" });
    }

    return res.status(StatusCodes.OK).json({
      message: "Thông tin người dùng đã được cập nhật",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Đã xảy ra lỗi khi cập nhật thông tin người dùng",
    });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(StatusCodes.OK).json({ message: "Người dùng đã bị xóa" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Đã xảy ra lỗi" });
  }
};

//chặn và mở chặn user
export const toggleBlockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    user.isBlocked = !user.isBlocked; // Toggle block status
    await user.save();

    res.status(StatusCodes.OK).json({
      message: `Người dùng đã ${user.isBlocked ? "bị chặn" : "được mở chặn"}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Đã xảy ra lỗi" });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Người dùng không tồn tại" });
    }

    // Check if user is already admin
    if (user.role === "admin") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Người dùng này đã là admin" });
    }

    // Update role to 'admin'
    user.role = "admin";
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Người dùng đã được nâng cấp thành admin", user });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Đã xảy ra lỗi" });
  }
};

export const getUsers = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    // Nếu có userId, lấy thông tin chi tiết của người dùng đó
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Người dùng không tồn tại" });
      }
      return res.status(StatusCodes.OK).json({ user });
    }

    // Nếu không có userId, lấy danh sách tất cả người dùng
    const users = await User.find();
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error); // Ghi log lỗi
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi trong quá trình lấy danh sách người dùng" });
  }
};

export const changePassword = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params
  const { currentPassword, newPassword } = req.body; // Không cần lấy confirmNewPassword từ backend

  // Kiểm tra các trường cần thiết
  if (!currentPassword || !newPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Vui lòng điền đầy đủ các trường bắt buộc",
    });
  }

  try {
    // Tìm người dùng bằng userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Người dùng không tồn tại",
      });
    }

    // So sánh mật khẩu hiện tại với mật khẩu đã được mã hóa trong cơ sở dữ liệu
    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Mật khẩu hiện tại không chính xác",
      });
    }

    // Mã hóa mật khẩu mới
    const hashedNewPassword = await bcryptjs.hash(newPassword, 12);

    // Cập nhật mật khẩu của người dùng
    user.password = hashedNewPassword;
    await user.save();

    // Trả về thông báo thành công
    return res.status(StatusCodes.OK).json({
      message: "Mật khẩu đã được thay đổi thành công",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Đã xảy ra lỗi khi thay đổi mật khẩu",
    });
  }
};

export const logout = async (req, res) => {};
