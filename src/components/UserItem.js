import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ user, deleteUser }) => {
  return (
    <tr>
      <td className="border p-2">{user.id}</td>
      <td className="border p-2">{user.name}</td>
      <td className="border p-2">{user.email}</td>
      <td className="border p-2">
        <Link to={`/edit/${user.id}`} className="bg-blue-500 text-white px-2 py-1 mr-2">Edit</Link>
        <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
      </td>
    </tr>
  );
};

export default UserItem;