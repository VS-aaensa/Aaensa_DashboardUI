import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteOne  ()  {
  console.log("getting here in Protectedrouts");
 const token = window.localStorage.getItem("token");
  return(

    <>{token ? <Outlet /> : <Navigate to="/" />}</>
  )
};

export default ProtectedRouteOne;
