import HttpService from "./http-service";

export interface Genre {
    _id: number;
    name: string;
}

export default new HttpService<Genre>("/genres");
