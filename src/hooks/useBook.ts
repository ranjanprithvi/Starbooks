import { Book } from "../models/book";
import useDataItem from "./generic/useDataItem";

const useBook = (id: string = "new", reset?: any) => {
    const {
        data: book,
        setData: setBook,
        error,
        setError,
        isLoading,
    } = useDataItem<Book>("/books", id, reset);
    return { book, setBook, error, setError, isLoading };
};

export default useBook;
