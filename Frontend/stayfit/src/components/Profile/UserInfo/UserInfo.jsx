import { React, useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import axios from "axios";
import API_URL from "../../../config";

function UserInfo() {
  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: Date.now(),
  });

  const handleUpdateInfo = async () => {
    try {
      console.log(accountInfo);
      const response = await axios.put(
        `${API_URL}/api/v1/user/info`,
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

  const fetchAccountInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/user/info`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setAccountInfo(response.data);
      }
    } catch (error) {
      console.log("Error fetching info ", error);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  return (
    <div>
      <div class="row align-items-stretch ms-md-5">
        <ProfilePicture />
        <div class="col-xl-8">
          <div class="card mt-2">
            <div class="card-header text-center">
              <h5 className="mb-0">Profile Details</h5>
            </div>
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
                  Save Changes
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
