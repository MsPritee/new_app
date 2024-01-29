import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleUpdate = (id) => {
    setEditableRow(id);
  };

  const handleSave = (id) => {
    setEditableRow(null);
  };

  const handleCancel = () => {
    setEditableRow(null);
  };

  const isRowEditable = (id) => {
    return editableRow === id;
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };
  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div>
      <h1>Data Table</h1>
      <table
        style={{
          width: "80%",
          marginLeft: "10%",
          marginRight: "10%",
          justifyItems: "center",
        }}
      >
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {isRowEditable(item.id) ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(item.id, "name", e.target.value)
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {isRowEditable(item.id) ? (
                  <input
                    type="text"
                    value={item.username}
                    onChange={(e) =>
                      handleInputChange(item.id, "username", e.target.value)
                    }
                  />
                ) : (
                  item.username
                )}
              </td>
              <td>
                {isRowEditable(item.id) ? (
                  <input
                    type="text"
                    value={item.email}
                    onChange={(e) =>
                      handleInputChange(item.id, "email", e.target.value)
                    }
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {isRowEditable(item.id) ? (
                  <>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdate(item.id)}>
                      Update
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
