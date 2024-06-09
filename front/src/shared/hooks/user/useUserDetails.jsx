import { useState } from "react";
import { useLogout as logoutHandler } from "./useLogout"

const getUserDetails = () => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
        return JSON.parse(userDetails);
    }
    return null;
};

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails());

    const logout = () => {
        logoutHandler();
    };

    return {
        isLogged: Boolean(userDetails),
        username: userDetails?.username ? userDetails.username : "Guest",
        user: userDetails,
        logout,
    };
};