import bookService, { Book, BookQuery } from "../services/book-service";
import HttpService from "../services/http-service";
import useData from "./useData";

const useBooks = (query?: BookQuery, deps?: any[]) =>
    useData<Book>(bookService, query, deps);
// export default new HttpService<Book>("/books", {
//     params: { genre: selectedGenre._id },
// });

export default useBooks;
