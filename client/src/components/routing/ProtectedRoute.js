import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { AuthContext } from "../../context/AuthContext";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AuthContext);
    const { isLoading, isAuthenticated } = state;

    if (isLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <NavbarMenu />
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default ProtectedRoute;
