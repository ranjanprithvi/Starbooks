import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";

interface Props {
    children: JSX.Element;
}

const ProtectedComponent = ({ children }: Props) => {
    const { isLoggedIn } = useContext(LoginContext);

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedComponent;
