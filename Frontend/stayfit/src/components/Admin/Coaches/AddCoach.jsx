import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../../config";

function AddCoach({ setAddCoach, fetchCoaches }) {
  const [coach, setCoach] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    email: "",
    username: "",
    password: "",
  });

  const handleAddCoach = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/admin/coach`,
        coach,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchCoaches();
        setAddCoach(false);
        console.log("Coach added successfully");
      }
    } catch (error) {
      console.log("Error adding coach:", error);
    }
  };

  return (
    <div className="card h-100 w-100">
      <div className="card-header">Add Coach</div>
      <div className="card-body">
        <form onSubmit={(e) => handleAddCoach(e)}>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="First Name"
              value={coach.firstName}
              onChange={(e) =>
                setCoach({
                  ...coach,
                  firstName: e.target.value,
                })
              }
              required
            />
            <input
              className="form-control ms-2"
              type="text"
              placeholder="Last Name"
              value={coach.lastName}
              onChange={(e) =>
                setCoach({
                  ...coach,
                  lastName: e.target.value,
                })
              }
              required
            />
          </div>
          <input
            className="form-control mt-2"
            type="text"
            placeholder="Qualification"
            value={coach.qualification}
            onChange={(e) =>
              setCoach({
                ...coach,
                qualification: e.target.value,
              })
            }
            required
          />
          <input
            className="form-control mt-2"
            type="email"
            placeholder="Email"
            value={coach.email}
            onChange={(e) =>
              setCoach({
                ...coach,
                email: e.target.value,
              })
            }
            required
          />
          <input
            className="form-control mt-2"
            type="text"
            placeholder="Username"
            value={coach.username}
            onChange={(e) =>
              setCoach({
                ...coach,
                username: e.target.value,
              })
            }
            required
          />
          <input
            className="form-control mt-2"
            type="text"
            placeholder="Password"
            value={coach.password}
            onChange={(e) =>
              setCoach({
                ...coach,
                password: e.target.value,
              })
            }
            required
          />
          <button className="mt-2 me-1" type="submit">
            <i className="fa-solid fa-floppy-disk d-flex align-items-center fs-3 "></i>
          </button>
          <button className="mt-2 ms-1" onClick={() => setAddCoach(false)}>
            <i className="fa-solid fa-xmark d-flex align-items-center fs-3 "></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCoach;
