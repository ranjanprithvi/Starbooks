import apiClient from "./api-client";

export interface Entity {
    _id: number;
}

class HttpService<T extends Entity> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll() {
        const controller = new AbortController();
        return {
            request: apiClient.get<T[]>(this.endpoint, {
                signal: controller.signal,
            }),
            cancel: () => controller.abort(),
        };
    }

    delete(id: number) {
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
