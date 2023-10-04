import { Author } from "../models/author";
import useData from "./generic/useData";

const useAuthors = () => {
    const {
        data: authors,
        setData: setAuthors,
        error,
        setError,
        isLoading,
    } = useData<Author>("/authors");
    return { authors, setAuthors, error, setError, isLoading };
};

export default useAuthors;
