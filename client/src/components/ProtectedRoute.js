import React from "react"
import { Route, Redirect } from "react-router-dom";
import { withListData } from "../context/BigDataProvider.js"

const ProtectedRoute = (props) => {
    //set state user: _id
    const { component: Component, ...rest } = props;
    console.log(rest)
    return (
        props.token ?
            <Route {...rest} component={Component} /> :
            <Redirect to="/" />
    )
}

export default withListData(ProtectedRoute); 
  
