import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function useCurrentUser() {
  const { currentUser } = useContext(AuthContext);

  return currentUser;
}
