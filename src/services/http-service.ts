import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

export interface Entity {
    _id: string;
}

class HttpService<T extends Entity> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll(query?: Object) {
        const controller = new AbortController();
        return {
            request: apiClient.get<T[]>(this.endpoint, {
                signal: controller.signal,
                params: query,
            }),
            cancel: () => controller.abort(),
        };
    }

    get(id: string) {
        const controller = new AbortController();
        return {
            request: apiClient.get<T>(`${this.endpoint}/${id}`, {
                signal: controller.signal,
            }),
            cancel: () => controller.abort(),
        };
    }

    delete(id: string) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }

    add(entity: T) {
        return apiClient.post<T>(this.endpoint, entity);
    }

    update(entity: T) {
        return apiClient.put(`${this.endpoint}/${entity._id}`, entity);
    }
}

export default HttpService;
