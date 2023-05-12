import React from "react";
import { UserAuth } from "./AuthContext";


const ProtectedRoute = ({children}) => {
    const {user} = UserAuth();

    if (!user) {
        // navigate
    }
    return children;
};
export default ProtectedRoute; 