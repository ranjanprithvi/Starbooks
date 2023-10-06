import { User, UserQuery } from "../models/user";
import useDataItem from "./generic/useDataItem";

const useUser = (id: string = "new", query?: UserQuery, reset?: any) => {
    const {
        data: user,
        setData: setUser,
        error,
        setError,
        isLoading,
    } = useDataItem<User>("/users", id, query, reset);
    return { user, setUser, error, setError, isLoading };
};

export default useUser;
