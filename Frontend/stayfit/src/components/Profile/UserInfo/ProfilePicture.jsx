import { React, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../../config";

function ProfilePicture() {
  const [picture, setPicture] = useState(null);

  const handleUploadPicture = () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            const formData = new FormData();
            formData.append("picture", file);

            axios
              .put(`${API_URL}/api/v1/user/picture`, formData, {
                withCredentials: true,
              })
              .then((response) => {
                if (response.status === 200) {
                  console.log("Picture uploaded successfully");
                }
              })
              .catch((error) => {
                console.log("Error uploading picture: ", error);
              });

            setPicture(file);
          };
        }
      };
    } catch (error) {
      console.log("Error uploading picture", error);
    }
  };

  const handleRemovePicture = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/user/picture`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPicture(null);
        console.log("Picture removed successfully");
      }
    } catch (error) {
      console.log("Error removing picture: ", error);
    }
  };

  const fetchPicture = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/user/picture`, {
        responseType: "blob",
        withCredentials: true,
      });
      if (response.status === 200) {
        if (response.data.size !== 0) {
          setPicture(response.data);
        }
      }
    } catch (error) {
      console.log("Error fetching picture ", error);
    }
  };

  useEffect(() => {
    fetchPicture();
  }, []);

  return (
    <div class="col-xl-4">
      <div class="card profile-picture mt-2">
        <div class="card-header text-center">
          <h5 className="mb-0">Profile Picture</h5>
        </div>
        <div class="card-body text-center py-3">
          <img
            class="img"
            src={picture ? URL.createObjectURL(picture) : "images/user.png"}
            alt="Profile Picture"
          />
          <button
            class="btn btn-primary mt-4 d-block mx-auto"
            type="button"
            onClick={() => handleUploadPicture()}
          >
            Upload Image
          </button>
          <button
            class="btn btn-primary mt-4 mb-2 d-block mx-auto"
            type="button"
            onClick={() => handleRemovePicture()}
          >
            Remove Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;
