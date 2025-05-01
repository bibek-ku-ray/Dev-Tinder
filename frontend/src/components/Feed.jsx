import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const feedData = useSelector((state) => state.feed);
  console.log("feedData:: ", feedData?.data[0]);
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log("res.data feed: ", res.data);
    } catch (error) {
      console.log("Error feed: ", error);
    }
  };

  useEffect(() => {
    if (!feedData) {
      fetchFeedData();
    }
  }, []);

  return (
    feedData && (
      <div className="flex justify-center mt-20">
        {feedData.data.length > 0 ? (
          <UserCard user={feedData?.data[1]} />
        ) : (
          <div>No feed</div>
        )}
      </div>
    )
  );
};

export default Feed;
