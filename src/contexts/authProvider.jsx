import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { AuthContext } from "./authContext.js";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants.js";

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage());

  function onLogin(token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    setCurrentUser({
      decoded: getUserFromToken(token),
      coded: token
    });
  }

  function onLogout() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function getUserFromLocalStorage() {
  let currentUser = null;
  const userToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (userToken) {
    currentUser = {
      decoded: getUserFromToken(userToken),
      coded: userToken
    };
  }
  return currentUser;
}

function getUserFromToken(token) {
  try {
    return jwtDecode(token);
  } catch (err) {
    return err;
  }
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
