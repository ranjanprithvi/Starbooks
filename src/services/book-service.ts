import HttpService from "./http-service";
import { Genre } from "./genre-service";

export interface Book {
    _id: string;
    title: string;
    coverImage: string;
    author: { name: string };
    genre: Genre;
    rating: number;
}

export interface BookQuery {
    author?: string;
    genre?: string;
    search?: string;
}

export default new HttpService<Book>("/books");
