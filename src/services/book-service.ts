import { Genre } from "./genre-service";
import HttpService from "./http-service";

export interface Book {
    _id: number;
    title: string;
    coverImage: string;
    author: { name: string };
    genre: Genre;
    rating: number;
}

export default new HttpService<Book>("/books");
