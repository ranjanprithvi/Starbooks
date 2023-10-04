import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    _id: string;
    title: string;
    coverImage: string;
    author: Author;
    genre: Genre;
    rating: number;
    yearPublished: number;
    description: string;
    numberInStock: number;
}

export interface BookQuery {
    author?: string;
    genre?: string;
    search?: string;
    sortBy?: string;
}

export interface BookSort {
    [key: string]: string;
}

export const bookSortFields: BookSort[] = [
    { name: "Date Added", value: "-_id" },
    { name: "Title", value: "title" },
    { name: "Rating", value: "-rating" },
    { name: "Year Published", value: "-yearPublished" },
];
