import { Author } from "../models/author";
import useData from "./generic/useData";

const useAuthors = (deps?: any[]) => {
    const {
        data: authors,
        setData: setAuthors,
        error,
        setError,
        isLoading,
    } = useData<Author>("/authors", {}, deps);
    return { authors, setAuthors, error, setError, isLoading };
};

export default useAuthors;
