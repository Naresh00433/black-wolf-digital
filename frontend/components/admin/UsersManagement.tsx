"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR",
  });

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("black_wolf_user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.role === "SUPER_ADMIN") {
        setIsSuperAdmin(true);
      }
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("black_wolf_token");

      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("black_wolf_token");

      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("User created successfully");

        setShowModal(false);

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "EDITOR",
        });

        fetchUsers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  if (!loading && !isSuperAdmin) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
        Access Denied. Only SUPER_ADMIN can access this page.{" "}
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this user?"))
      return;

    const token = localStorage.getItem("black_wolf_token");

    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
      fetchUsers();
    }
  };

  const handleToggleStatus = async (id: number) => {
    const token = localStorage.getItem("black_wolf_token");

    const res = await fetch(`http://localhost:5000/api/users/${id}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      fetchUsers();
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    const token = localStorage.getItem("black_wolf_token");

    const res = await fetch(
      `http://localhost:5000/api/users/${editingUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingUser.name,
          role: editingUser.role,
        }),
      },
    );

    const data = await res.json();

    if (data.success) {
      setShowEditModal(false);
      setEditingUser(null);
      fetchUsers();
    }
  };

  return (
    <div className="space-y-6">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 rounded-lg border border-white/10 bg-black p-3 text-white"
        />
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black"
        >
          + Add User
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
${
  user.role === "SUPER_ADMIN"
    ? "bg-red-500/20 text-red-400"
    : user.role === "ADMIN"
      ? "bg-cyan-500/20 text-cyan-400"
      : "bg-gray-500/20 text-gray-300"
}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">{user.isActive ? "Active" : "Inactive"}</td>

                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setShowEditModal(true);
                      }}
                      className="rounded bg-blue-500 px-2 py-1 text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className="rounded bg-yellow-500 px-2 py-1 text-xs text-black"
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="rounded bg-red-500 px-2 py-1 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">
            <h2 className="mb-5 text-xl font-bold">Edit User</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black p-3"
              />

              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    role: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black p-3"
              >
                <option value="EDITOR">EDITOR</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>

              <div className="flex gap-3">
                <button
                  onClick={handleEditUser}
                  className="flex-1 rounded-lg bg-cyan-400 py-3 font-semibold text-black"
                >
                  Save
                </button>

                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-lg border border-white/10 py-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="mb-5 text-xl font-bold text-white">Add User</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black p-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black p-3"
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black p-3"
              />

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black p-3"
              >
                <option value="EDITOR">EDITOR</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>

              <div className="flex gap-3">
                <button
                  onClick={handleCreateUser}
                  className="flex-1 rounded-lg bg-cyan-400 py-3 font-semibold text-black"
                >
                  Create User
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-white/10 py-3 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
