import { instance } from "@/configs/instance";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface UserForm {
  name: string;
  email: string;
}

const EditAuth: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(data.user);

        reset(data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    })();
  }, [userId, reset]);

  // Xử lý khi submit form
  const onSubmit = async (data: UserForm) => {
    try {
      const response = await instance.put(`/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("User updated successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      alert("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Edit Account
      </Typography>

      <Box textAlign="center" mb={2}>
        <Avatar
          src={"../upload/default-avatar.jpeg"}
          alt="User Avatar"
          sx={{ width: 80, height: 80, mx: "auto" }}
        />
      </Box>

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      {/* Name Field */}
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
          maxLength: { value: 30, message: "Name can't exceed 30 characters" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isSubmitting} // Disable button when form is submitting
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
};

export default EditAuth;
