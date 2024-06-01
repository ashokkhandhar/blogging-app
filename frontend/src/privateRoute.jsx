import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({element: Element, ...rest}) => {
    if(!localStorage.getItem("userInfo")){
        return <Navigate to="/login" />;
    }
    return <Element />;
}

export default PrivateRoute;