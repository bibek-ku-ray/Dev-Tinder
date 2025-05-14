import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, disableButton = false }) => {

  const {
    _id,
    firstName,
    lastName,
    username,
    age,
    gender,
    bio,
    profilePicture,
    skills,
  } = user;

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const feedSelector = useSelector(state=>state.feed)

  const handleIgnoreInterested = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    
  })

  return (
    <div>
      <div className="card bg-base-300 w-80 shadow-primary shadow-sm">
        <figure>
          <img
            src={`${profilePicture}`}
            alt="profile picture"
            className="h-64 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="mt-0 card-title text-xl">
            {" "}
            <code>{"@" + username}</code>{" "}
          </h2>
          <p className="card-title font-normal">{firstName + " " + lastName}</p>
          {age && gender && <p className="mt-0 text-xm">{age + ", " + gender}</p>}
          <hr className="border-primary" />
          <p>{bio} </p>
          <div>
            <code>{skills && skills.join(", ")}</code>
          </div>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-accent font-normal"
              disabled={disableButton}
              onClick={() => handleIgnoreInterested("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary font-normal"
              disabled={disableButton}
              onClick={() => handleIgnoreInterested("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
