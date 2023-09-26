import authorService, { Author } from "../services/author-service";
import useData from "./useData";

const useAuthors = () => {
    const {
        data: authors,
        setData: setAuthors,
        error,
        setError,
        isLoading,
    } = useData<Author>(authorService);
    return { authors, setAuthors, error, setError, isLoading };
};

export default useAuthors;
