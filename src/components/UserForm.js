import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserForm = ({ isEdit }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { id: Date.now(), name, email };

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (isEdit) {
      storedUsers = storedUsers.map(user => (user.id === parseInt(id) ? newUser : user));
    } else {
      storedUsers.push(newUser);
    }

    localStorage.setItem("users", JSON.stringify(storedUsers));

    try {
      if (isEdit) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email });
      } else {
        await axios.post("https://jsonplaceholder.typicode.com/users", { name, email });
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-6">
      <div className="w-96 bg-gray-800 border border-pink-500 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">
          {isEdit ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-pink-500 bg-gray-700 text-white p-3 rounded-lg focus:outline-none placeholder-pink-400"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full border border-pink-500 bg-gray-700 text-white p-3 rounded-lg focus:outline-none placeholder-pink-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold transition-all bg-pink-500 hover:bg-pink-600"
          >
            {isEdit ? "Save Changes" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
