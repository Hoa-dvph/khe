import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "@/configs/instance";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const EditPassword: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<PasswordForm>();

  const onSubmit = async (data: PasswordForm) => {
    try {
      await instance.put(
        `/users/${userId}/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Password updated successfully");
      navigate("/login");
    } catch (error) {
      alert("Error updating password");
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Change Password
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password Field */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.currentPassword && (
            <span className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmNewPassword", {
              required: "Confirming the new password is required",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { newPassword } = getValues();
                  return newPassword === value || "Passwords do not match";
                },
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.confirmNewPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmNewPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white bg-indigo-600 rounded-md 
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
