import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "../utils/isAuth";

export default function RootPage() {
	console.log("root :>> ");
	return <Navigate to={isAuth()[0] ? "/home" : `/login`} />;
}
