import React, { useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

function App() {
  const [user, setUser] = useState({ userId: "", name: "", email: "" });
  const [fetchedUser, setFetchedUser] = useState(null);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleCreate = () => createUser(user).then(() => alert("Created"));
  const handleRead = () =>
    getUsers(user.userId)
      .then((res) => setFetchedUser(res.data))
      .catch(() => alert("User not found"));
  const handleUpdate = () => updateUser(user.userId, user).then(() => alert("Updated"));
  const handleDelete = () => deleteUser(user.userId).then(() => alert("Deleted"));

  return (
    <div style={{ padding: 20 }}>
      <h1>User CRUD (React + AWS Lambda)</h1>
      <input name="userId" placeholder="User ID" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleRead}>Read</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>

      {fetchedUser && (
        <div>
          <h3>Fetched User:</h3>
          <p>ID: {fetchedUser.userId}</p>
          <p>Name: {fetchedUser.name}</p>
          <p>Email: {fetchedUser.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
