import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetching all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Make POST request to add a new user (this won't persist to a database, just simulates)
    const newUser = { name, email };
    
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      // Add the new user to the list
      setUsers([...users, response.data]);
      navigate("/");
    } catch (error) {
      console.error("There was an error adding the user:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Add
        </button>
      </form>

      <h3 className="mt-4 text-xl">All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};
