import { React, useState, useEffect } from "react";
import axios from "axios";

function UserInfo() {
  const [picture, setPicture] = useState(null);
  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: Date.now(),
  });

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
              .put("http://localhost:8080/api/v1/user/picture", formData, {
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

  const handleUpdateInfo = async () => {
    try {
      console.log(accountInfo);
      const response = await axios.put(
        "http://localhost:8080/api/v1/user/info",
        accountInfo,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Informations updated successfully");
      }
    } catch (error) {
      console.log("Error updating info: ", error);
    }
  };

  const fetchPicture = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/picture",
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.size !== 0) {
          setPicture(response.data);
        }
      }
    } catch (error) {
      console.log("Error fetching picture ", error);
    }
  };

  const fetchAccountInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/info",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setAccountInfo(response.data);
      }
    } catch (error) {
      console.log("Error fetching info ", error);
    }
  };

  useEffect(() => {
    fetchPicture();
    fetchAccountInfo();
  }, []);

  return (
    <div>
      <div class="row align-items-center ms-md-5">
        <div class="col-xl-4">
          <div class="card profile-picture mt-2">
            <div class="card-header text-center">Profile Picture</div>
            <div class="card-body text-center py-5">
              <img
                class="img"
                src={
                  picture
                    ? URL.createObjectURL(picture)
                    : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                }
                alt="Profile Picture"
              />
              <button
                class="btn btn-primary mt-4 mb-2 d-block mx-auto"
                type="button"
                onClick={() => handleUploadPicture()}
              >
                Upload image
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="card mt-2">
            <div class="card-header text-center">Account Details</div>
            <div class="card-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault(true);
                  handleUpdateInfo();
                }}
              >
                <div class="mb-3">
                  <label class="mb-1">First Name</label>
                  <input
                    class="form-control"
                    type="text"
                    value={accountInfo.firstName}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="mb-3">
                  <label class="mb-1">Last Name</label>
                  <input
                    class="form-control"
                    type="text"
                    value={accountInfo.lastName}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="mb-3">
                  <label class="mb-1">Email</label>
                  <input
                    class="form-control"
                    type="email"
                    value={accountInfo.email}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="mb-1">Phone</label>
                    <input
                      class="form-control"
                      type="text"
                      value={accountInfo.phone}
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="mb-1" for="inputBirthday">
                      Birthday
                    </label>
                    <input
                      class="form-control"
                      type="date"
                      name="birthday"
                      value={accountInfo.dateOfBirth}
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button class="btn btn-primary" type="submit">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
