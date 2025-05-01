import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requestSelector = useSelector((state) => state.request);
  const [localRequests, setLocalRequests] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchRequestConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      setLocalRequests(res.data.data);
      console.log("requestSelector: ", requestSelector);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInterestIgnore = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setLocalRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== _id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestConnections();
  }, []);

  useEffect(() => {
    if (requestSelector) {
      setLocalRequests(requestSelector);
    }
  }, [requestSelector]);

  return (
    <div className="flex flex-col items-center mt-6">
      <div>
        <h2 className="text-3xl font-bold">Connection Requests</h2>
      </div>
      {localRequests &&
        localRequests.map((req) => {
          return (
            <div
              key={req._id}
              className="card card-side bg-base-300 shadow-sm mt-6 w-1/2"
            >
              <figure>
                <img
                  className="w-32 object-cover"
                  src={req.fromUserId.profilePicture}
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title tracking-wider">
                  {req?.fromUserId?.firstName + " " + req?.fromUserId?.lastName}
                </h2>
                <p>
                  {" "}
                  <code>{req.fromUserId.skills.join(", ")}</code>{" "}
                </p>
                <p> {req.fromUserId.bio} </p>
              </div>
              <div className="flex gap-4 items-center px-5">
                <button
                  className="btn btn-soft btn-error"
                  onClick={() => handleInterestIgnore("rejected", req._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-soft btn-success"
                  onClick={() => handleInterestIgnore("accepted", req._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Request;
