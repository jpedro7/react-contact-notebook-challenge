import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import api from "../services/api";

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await api.get(url, options);
                setData(response.data.results);
            } catch (error) {
                // setError(error);
            } finally {
                setIsFetching(false);
            }
        }

        loadData()
    }, []);

    return { data, isFetching };
}
