import HttpService from "./http-service";

export interface Book {
    _id: number;
    title: string;
    coverImage: string;
    author: { name: string };
    rating: number;
}

export default new HttpService<Book>("/books");
