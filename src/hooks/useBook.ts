import bookService, { Book } from "../services/book-service";
import useDataItem from "./generic/useDataItem";

const useBook = (id: string) => {
    const {
        data: book,
        setData: setBook,
        error,
        setError,
        isLoading,
    } = useDataItem<Book>(bookService, id);
    return { book, setBook, error, setError, isLoading };
};

export default useBook;
