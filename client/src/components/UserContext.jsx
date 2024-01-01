import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/userData").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
