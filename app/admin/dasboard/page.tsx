"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ✅ Proper Type
type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

const AdminDasboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]); // ✅ fixed

  async function UsersData() {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const response = await api.get("/admin/data", {
        headers:  { Authorization: `Bearer ${token}` },
          
        withCredentials: true,
      });

      const data = response.data; // ✅ no await

      setUsers(data.users); // ✅ no await

      toast.success(data.message);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    UsersData();
  }, []);

  return (
    <div  >
      {loading ? (
        <p>Data loading ...</p>
      ) : (
        <div>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <div key={user.id}>
                <p>Name: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDasboard;