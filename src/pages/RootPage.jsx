import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "../utils/isAuth";

const RootPage = () => {
	return <Navigate to={isAuth() ? "/home" : "/login"} />;
};

export default RootPage;
