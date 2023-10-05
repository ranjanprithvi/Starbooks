import { User, UserQuery } from "../models/user";
import useData from "./generic/useData";

const useUsers = (query?: UserQuery, deps?: any[]) => {
    const {
        data: users,
        setData: setUsers,
        error,
        setError,
        isLoading,
    } = useData<User>("/users", query, deps);
    return { users, setUsers, error, setError, isLoading };
};

export default useUsers;
