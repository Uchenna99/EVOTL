import { create } from "zustand";
import { EvtolUser } from "./Components/interface";


export interface JwtCode {
    iat: number;
    id: string;
    name: string;
    role: "USER" | "ADMIN";
  }
  


interface GlobalState {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean)=>void;
    activeUser: EvtolUser | null;
    setActiveUser: (activeUser: EvtolUser)=>void;
    jwtDecoded: JwtCode | null;
    setJwtDecoded: (jwtDecode: JwtCode)=>void;
}


const useGlobalState = create<GlobalState>((set)=>({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean)=>set({loggedIn}),
    activeUser: null,
    setActiveUser: (activeUser: EvtolUser)=>set({activeUser}),
    jwtDecoded: null,
    setJwtDecoded: (jwtDecoded: JwtCode)=>set({jwtDecoded})
}));



export default useGlobalState;