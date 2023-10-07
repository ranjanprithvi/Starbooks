import { createContext } from "react";

interface ILoginContext {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isAdmin: boolean;
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoginContext = createContext<ILoginContext>({} as ILoginContext);
