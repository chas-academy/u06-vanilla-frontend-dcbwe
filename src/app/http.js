import { getBearer } from "./session.js";

export const HttpRequest = (url, options = {}) =>
    fetch(url, options).then(async (response) => {
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        return response.status === 204 ? null : response.json();
    });

export const HttpHeaders = {
    json: (param) => ({
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getBearer(),
        ...param,
    }),
    form: (param) => ({
        Accept: "application/json",
        ...getBearer(),
        ...param,
    }),
    authOnly: (param) => ({
        ...getBearer(),
        ...param,
    }),
    public: (param) => ({
        Accept: "application/json",
        "Content-Type": "application/json",
        ...param,
    }),
};

export const HttpBody = {
    json: (data) => JSON.stringify(data),
    raw: (text) => text,
};

export const HttpClient = {
    get: (url, param) =>
        HttpRequest(url, {
            method: "GET",
            headers: HttpHeaders.json(param),
        }),
    post: (url, data, param) =>
        HttpRequest(url, {
            method: "POST",
            headers: HttpHeaders.json(param),
            body: HttpBody.json(data),
        }),
    put: (url, data, param) =>
        HttpRequest(url, {
            method: "PUT",
            headers: HttpHeaders.json(param),
            body: HttpBody.json(data),
        }),
    delete: (url, param) =>
        HttpRequest(url, {
            method: "DELETE",
            headers: HttpHeaders.json(param),
        }),
};