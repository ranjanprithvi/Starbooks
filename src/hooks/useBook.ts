import { Book, BookQuery } from "../models/book";
import useDataItem from "./generic/useDataItem";

const useBook = (id: string = "new", query: BookQuery, reset?: any) => {
    const {
        data: book,
        setData: setBook,
        error,
        setError,
        isLoading,
    } = useDataItem<Book>("/books", id, query, reset);
    return { book, setBook, error, setError, isLoading };
};

export default useBook;
