import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class BaseService {
    public http: AxiosInstance

    constructor(httpClient: AxiosInstance = axios.create()) {
        this.http = httpClient
    }

    protected handleRequest(config: AxiosRequestConfig) {
        return config
    }

    protected handleResponse({ data }: AxiosResponse) {
        return data
    }

    protected handleError(error: unknown) {
        return Promise.reject(error)
    }
}
