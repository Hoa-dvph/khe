import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { instance } from "@/configs/instance";

interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  isBlocked: boolean;
  avatar: string;
}

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get<{ users: User[] }>("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(data.users);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);

  const handleBlockChange = async (userId: string, isBlocked: boolean) => {
    try {
      await instance.patch(
        `/users/${userId}/toggle-block`,
        { isBlocked: !isBlocked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Thao tác thành công");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  const handleRoleChange = async (userId: string, role: "user" | "admin") => {
    try {
      await instance.patch(
        `/users/${userId}/promote`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Đã chuyển người dùng thành admin");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );
    } catch (error) {
      alert("Người nãy đã là admin hoặc đã có lỗi xảy ra");
      console.log("🚀 ~ error:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Blocked</TableCell>
            <TableCell>Avatar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(
                      user._id,
                      e.target.value as "user" | "admin"
                    )
                  }
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={user.isBlocked ? "true" : "false"}
                  onChange={() => handleBlockChange(user._id, user.isBlocked)}
                >
                  <MenuItem value="false">Active</MenuItem>
                  <MenuItem value="true">Blocked</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <img src={user.avatar} alt="Avatar" width="40" height="40" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserAdmin;
