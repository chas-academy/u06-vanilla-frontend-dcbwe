import { CONFIG } from "./config.js";

export const Endpoints = {
    DOMAIN: CONFIG.DEV,
    users: {
        account: (id) => `${Endpoints.DOMAIN}/users/${id}`,
        profile: (id) => `${Endpoints.DOMAIN}/users/${id}/profile`,
        details: (id) => `${Endpoints.DOMAIN}/users/${id}/details`,
        settings: (id) => `${Endpoints.DOMAIN}/users/${id}/settings`,
        health: (id) => `${Endpoints.DOMAIN}/users/${id}/health`,
    },
    register: {
        signup: () => `${Endpoints.DOMAIN}/users/signup`,
        verify: () => `${Endpoints.DOMAIN}/users/verify`,
    },
    auth: {
        login: () => `${Endpoints.DOMAIN}/users/login`,
    }
};