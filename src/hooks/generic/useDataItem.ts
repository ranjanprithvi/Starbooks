import { useEffect, useState } from "react";
import { CanceledError } from "../../services/api-client";
import HttpService, { Entity } from "../../services/http-service";

function useDataItem<T extends Entity>(path: string, id: string, reset?: any) {
    const [data, setData] = useState<T>({} as T);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(
        () => {
            setLoading(true);

            const dataService = new HttpService(path);
            const { request, cancel } = dataService.get<T>(id);

            request
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                    setError("");

                    reset && reset(res.data);
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setLoading(false);
                })
                .finally(() => {
                    // console.log("Loader hidden");
                    // setLoading(false);
                });

            return () => cancel();
        },
        reset ? [reset] : []
    );

    return { data, setData, error, setError, isLoading };
}

export default useDataItem;
