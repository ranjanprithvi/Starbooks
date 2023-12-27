import { Sort } from "../components/common/SortSelector";
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
    populate?: string;
}

export const defaultBookCover = "/src/assets/default-no-cover.jpeg";

export const bookSortFields: Sort[] = [
    { name: "Date Added", value: "-_id" },
    { name: "Title", value: "title" },
    { name: "Rating", value: "-rating" },
    { name: "Year Published", value: "-yearPublished" },
];
