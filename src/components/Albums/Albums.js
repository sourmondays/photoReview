import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Album = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <p>
        You are logged in as {JSON.stringify(currentUser && currentUser.email)}
      </p>
    </div>
  );
};

export default Album;
