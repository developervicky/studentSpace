import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    if (!user) {
      axios.get("/userData").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }

    console.log(user);
  }, [user]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, setReady, windowSize }}
    >
      {children}
    </UserContext.Provider>
  );
}
