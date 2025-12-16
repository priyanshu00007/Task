import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState("");

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    salary: "",
    mobile: "",
    profilePic: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    try {
      const savedCities = localStorage.getItem("myCities");
      const savedUsers = localStorage.getItem("myUsers");
      if (savedCities) setCities(JSON.parse(savedCities));
      if (savedUsers) setUsers(JSON.parse(savedUsers));
    } catch (error) {
      console.error("Could not load from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("myCities", JSON.stringify(cities));
      localStorage.setItem("myUsers", JSON.stringify(users));
    } catch (error) {
      console.error("Could not save to local storage", error);
    }
  }, [cities, users]);

  const handleAddCity = () => {
    if (cityInput.trim() !== "") {
      setCities([...cities, cityInput]);
      setCityInput("");
    } else {
      alert("Please enter a city name");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        alert("File is too big! Please use a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitUser = () => {
    if (!formData.name || !formData.city || !formData.salary) {
      alert("Please fill in Name, City and Salary.");
      return;
    }

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, formData]);
    }

    setFormData({ name: "", city: "", salary: "", mobile: "", profilePic: "" });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
    window.scrollTo(0, 0);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    }
  };
const handleSalaryChange = (e) => {
  const value = e.target.value;
  if (value === "") {
    setFormData({ ...formData, salary: "" });
    return;
  }
  if (value.length <= 7) {
    setFormData({ ...formData, salary: value });
  }
};

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        PRACTICAL TASK
      </h2>

      <div className="section">
        <h3>Step 1:</h3>
        <label>City Name</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter City Name"
          />
        </div>
        <button className="btn-blue" onClick={handleAddCity}>
          Submit Button
        </button>
      </div>

      <div className="section">
        <h3>Step 2:</h3>

        <label>Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter Name"
        />

        <label>City</label>
        <select name="city" value={formData.city} onChange={handleInputChange}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label>Salary</label>
        <input
          name="salary"
          type="number"
          value={formData.salary}
          placeholder="Enter Salary (Max 7 digits)"
          min="0"
          onKeyDown={(e) => {
            if (
              e.key === "e" ||
              e.key === "E" ||
              e.key === "+" ||
              e.key === "-"
            ) {
              e.preventDefault();
            }
          }}
          onChange={handleSalaryChange}
        />

        <label>Mobile</label>
        <input
          name="mobile"
          type="text"
          value={formData.mobile}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setFormData({ ...formData, mobile: value });
            }
          }}
          placeholder="Enter 10-digit Mobile Number"
        />

        <label>Profile Picture</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />

        {formData.profilePic && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={formData.profilePic}
              alt="Preview"
              style={{ height: 80, border: "1px solid #ccc" }}
            />
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button className="btn-blue" onClick={handleSubmitUser}>
            {editIndex !== null ? "Update User" : "Submit Button"}
          </button>
        </div>
      </div>

      <div className="section">
        <h3>Step 3:</h3>
        <p>Display User Result and Provide Edit/ Delete functions:</p>

        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Mobile</th>
              <th>Profile Picture</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: "20px", color: "#888" }}>
                  No users added yet.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{user.name}</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "12px" }}>
                      {user.city}
                    </span>
                  </td>
                  <td>{user.salary}</td>
                  <td>{user.mobile}</td>
                  <td>
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="profile"
                        className="profile-img-small"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(index)}
                      className="action-btn"
                    >
                      ➝
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(index)}
                      className="action-btn"
                    >
                      ➝
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
