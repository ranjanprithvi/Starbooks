import HttpService from "./http-service";

export interface Author {
    _id: string;
    name: string;
}

export default new HttpService<Author>("/authors");
