import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);  // Display 8 users per page

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      if (response.status === 200) {
        const apiUsers = response.data;
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers([...apiUsers, ...storedUsers]);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again later.");
    }
    setLoading(false);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    // Remove from localStorage only if it's a manually added user
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newStoredUsers = storedUsers.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(newStoredUsers));
  };

  // Calculate the index of the first and last users to display
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">User Management Dashboard</h2>
      <div className="flex justify-end mb-4">
        <Link to="/add" className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">
          + Add User
        </Link>
      </div>
      {loading && <p className="text-center text-pink-400">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {users.length === 0 && !loading && <p className="text-center text-pink-400">No users found.</p>}

      {/* Table for Desktop */}
      <div className="overflow-x-auto sm:overflow-hidden">
        <table className="w-full border border-gray-600 text-center rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-pink-500">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => {
              const nameParts = user.name.split(' ');
              const firstName = nameParts[0];
              const lastName = nameParts.slice(1).join(' ');

              return (
                <tr key={user.id} className="border-t border-gray-600">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{firstName}</td>
                  <td className="p-3">{lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <Link to={`/edit/${user.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Edit</Link>
                    <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Card Layout) */}
      <div className="sm:hidden">
        {currentUsers.map(user => {
          const nameParts = user.name.split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ');

          return (
            <div key={user.id} className="bg-gray-800 p-4 rounded-lg mb-4">
              <div className="text-lg font-semibold text-pink-500">{firstName} {lastName}</div>
              <div className="text-sm text-gray-300">{user.email}</div>
              <div className="mt-4 flex justify-between">
                <Link to={`/edit/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit</Link>
                <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="bg-gray-600 text-white px-4 py-2 rounded-l-lg hover:bg-gray-700 disabled:bg-gray-500"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)} 
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-pink-500 text-white' : 'bg-gray-600 text-white'} hover:bg-pink-600`}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="bg-gray-600 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
