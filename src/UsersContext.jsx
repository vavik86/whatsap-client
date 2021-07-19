  
import { createContext } from "react";

export let UsersContext = createContext({
  myUser: {},
  allUsers: []
});