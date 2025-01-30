import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(""); 
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        setError("Error fetching user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false); 
    try {
    
      setName(name);  
      setEmail(email);  

 
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email });
      console.log("User updated: ", response.data);  
      setSuccess(true);  

 
      navigate("/"); 
    } catch (err) {
      setError("Error updating user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>

      {loading && <div>Loading...</div>}

      {error && <div style={{ color: "red" }}>{error}</div>}

      {success && <div style={{ color: "green" }}>User updated successfully!</div>}

      {!loading && (
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};
