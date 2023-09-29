import bookService, { Book } from "../services/book-service";
import useDataItem from "./generic/useDataItem";

const useBook = (id: string, resetBooks: any, reset: any) => {
    const {
        data: book,
        setData: setBook,
        error,
        setError,
        isLoading,
    } = useDataItem<Book>(bookService, id, resetBooks, reset);
    return { book, setBook, error, setError, isLoading };
};

export default useBook;
