import React from "react";
import Sidebar from "./Sidebar";
const Layout =(props)=>{
    const auth=props.auth;
    console.log("auth", auth);
    return(
        <>
        {auth?<Sidebar/>:""}
        </>
    )
}
export default Layout