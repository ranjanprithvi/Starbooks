import bookService, { Book, BookQuery } from "../services/book-service";
import HttpService from "../services/http-service";
import useData from "./generic/useData";

const useBooks = (query?: BookQuery, deps?: any[]) => {
    const {
        data: books,
        setData: setBooks,
        error,
        setError,
        isLoading,
    } = useData<Book>(bookService, query, deps);
    return { books, setBooks, error, setError, isLoading };
};

export default useBooks;
