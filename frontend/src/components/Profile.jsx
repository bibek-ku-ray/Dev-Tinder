import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const userData = useSelector((state) => state.user?.data);

  const dispatch = useDispatch()

  const [errMessage, setErrMessage] = useState("")
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [updateData, setUpdateData] = useState({
    username: userData?.username,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    age: userData?.age,
    gender: userData?.gender,
    bio: userData?.bio,
    skills: userData?.skills || [],
    profilePicture: userData?.profilePicture,
  });
  
  const [skillsString, setSkillsString] = useState(updateData.skills.join(", "))

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleUpdateUser = async () => {
    try {

      const dataToSend = {
        ...updateData, 
        skills: skillsString
          .split(",")
          .map(skill => skill.trim())
          .filter(skill => skill !== "")
      }

      const res = await axios.patch(`${BASE_URL}/profile/edit`, dataToSend, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
      setShowToastMessage(true)
      setTimeout(() => {
        setShowToastMessage(false)
      }, 3000);
    } catch (error) {
      setErrMessage(error.response.data)
      console.log(error)
    }
  }

  // useEffect(()=>{

  // },[])

  const clearError = () => {
    setErrMessage("");
  };

  return (
    <div className="flex justify-center mt-5 gap-5">
      {showToastMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="">
        <div className="flex items-center justify-center">
          <div className="card card-border bg-base-300 w-96 shadow-primary shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-normal">
                  Username
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Username"
                  value={updateData.username}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, username: e.target.value })
                  }
                />
                <legend className="fieldset-legend font-normal">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="First Name"
                  value={updateData.firstName}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, firstName: e.target.value });
                  }}
                />
                <legend className="fieldset-legend font-normal">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="First Name"
                  value={updateData.lastName}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, lastName: e.target.value });
                  }}
                />
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <legend className="fieldset-legend font-normal">Age</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Age"
                      value={updateData.age}
                      onChange={(e) => {
                        setUpdateData({ ...updateData, age: e.target.value });
                      }}
                    />
                  </div>
                  <div className="w-1/2">
                    <legend className="fieldset-legend font-normal">
                      Gender
                    </legend>
                    <select
                      value={updateData.gender}
                      onChange={(e) => {
                        setUpdateData({
                          ...updateData,
                          gender: e.target.value,
                        });
                      }}
                      className="select"
                    >
                      <option disabled={true}>Gender</option>
                      <option>male</option>
                      <option>female</option>
                      <option>other</option>
                    </select>
                  </div>
                </div>
                <legend className="fieldset-legend font-normal">
                  Profile Picture URL
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="URL"
                  value={updateData.profilePicture}
                  onChange={(e) => {
                    setUpdateData({
                      ...updateData,
                      profilePicture: e.target.value,
                    });
                  }}
                />
                <legend className="fieldset-legend font-normal">Skills</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Skills"
                  value={skillsString}
                  onChange={(e) => {
                    setSkillsString(e.target.value)
                    const skillsArray = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s !== "");
                    setUpdateData({ ...updateData, skills: skillsArray });
                  }}
                />
                <legend className="fieldset-legend font-normal">Bio</legend>
                <textarea
                  type="text"
                  className="w-full textarea"
                  placeholder="Bio"
                  value={updateData.bio}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, bio: e.target.value });
                  }}
                />

                {errMessage && (
                  <div
                    role="alert"
                    className="alert alert-error alert-soft flex justify-between items-center"
                  >
                    <div>
                      <p>{errMessage}</p>
                    </div>

                    <button onClick={clearError} className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <button
                  className="btn btn-primary mt-2"
                  onClick={handleUpdateUser}
                >
                  Update
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {" "}
        <UserCard user={updateData} disableButton={true} />{" "}
      </div>
    </div>
  );
};

export default Profile;
