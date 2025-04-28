import React from "react";

const UserCard = ({user, disableButton=false}) => {
  console.log("Card Data: ", user);

  const {
    firstName,
    lastName,
    username,
    age,
    gender,
    bio,
    profilePicture,
    skills,
  } = user;

 const handleIgnore = async (params) => {
  
 }

 const handleInterested = async (params) => {
  
 }

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
          <h2 className="mt-0 card-title text-xl"> <code>{"@" + username}</code> </h2>
          <p className="card-title font-normal">{firstName + " " + lastName}</p>
          <p className="mt-0 text-xm">{age + ", " + gender}</p>
          <hr className="border-primary" />
          <p>{bio} </p>
          <div><code>{skills && skills.join(", ")}</code></div>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-accent font-normal" disabled={disableButton}>Ignore</button>
            <button className="btn btn-primary font-normal" disabled={disableButton} >Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
