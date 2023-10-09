import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";

interface Props {
    children: JSX.Element;
}

const ProtectedAdminComponent = ({ children }: Props) => {
    const { isLoggedIn, isAdmin } = useContext(LoginContext);

    return isLoggedIn && isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedAdminComponent;
