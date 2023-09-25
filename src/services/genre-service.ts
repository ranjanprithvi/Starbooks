import HttpService from "./http-service";

export interface Genre {
    _id: string;
    name: string;
}

export default new HttpService<Genre>("/genres");
