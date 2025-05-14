import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom"

const Connections = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const connectionSelector = useSelector((state) => state.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data) );
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center mt-6">
        <div>
          <h2 className="text-3xl font-bold">Connection's</h2>
        </div>
        {connectionSelector &&
          connectionSelector.map((req) => {
            return (
              <div
                key={req._id}
                className="card card-side bg-base-300 shadow-sm mt-6 w-1/2"
              >
                <figure>
                  <img
                    className="w-32 object-cover"
                    src={req.profilePicture}
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title tracking-wider">
                    {req?.firstName + " " + req?.lastName}
                  </h2>
                  <p>
                    {" "}
                    <code>{req.skills.join(", ")}</code>{" "}
                  </p>
                  <p> {req.bio} </p>
                <Link to={`/chat/${req._id}`} className="btn btn-success w-28">Chat</Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;
