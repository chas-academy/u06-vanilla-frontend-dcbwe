import { Endpoints } from "./endpoints.js";
import { HttpClient } from "./http.js";
import { UserMapper } from "./mapper.js";
import { getUserId, Session } from "./session.js";

export const ApiService = {
    signup: async (email) => {
        const response = await HttpClient.post(Endpoints.register.signup(), { email });
        Session.set("verificationToken", response.verificationToken);
        Session.set("user", response.user);
        return { user: UserMapper.user(response.user), verificationToken: response.verificationToken };
    },
    verify: async (password) => {
        const verificationToken = Session.get("verificationToken");
        const data = await HttpClient.post(Endpoints.register.verify(), { password, token: verificationToken });
        Session.set("verificationToken", null);
        return data.message;
    },
    login: async (email, password) => {
        const response = await HttpClient.post(Endpoints.auth.login(), { email, password });
        Session.set("bearerToken", response.token);
        Session.set("user", response.user);
        return { user: UserMapper.user(response.user), token: response.token };
    },
    logout: () => Session.clear(),
    create: {
        profile: async (data) =>
            UserMapper.profile(await HttpClient.post(Endpoints.users.profile(getUserId()), data)),
        details: async (data) =>
            UserMapper.details(await HttpClient.post(Endpoints.users.details(getUserId()), data)),
    },
    update: {
        profile: async (data) =>
            UserMapper.profile(await HttpClient.put(Endpoints.users.profile(getUserId()), data)),
        details: async (data) =>
            UserMapper.details(await HttpClient.put(Endpoints.users.details(getUserId()), data)),
        settings: async (data) =>
            UserMapper.settings(await HttpClient.put(Endpoints.users.settings(getUserId()), data)),
    },
    fetch: {
        account: async () =>
            UserMapper.user(await HttpClient.get(Endpoints.users.account(getUserId()))),
        profile: async () =>
            UserMapper.profile(await HttpClient.get(Endpoints.users.profile(getUserId()))),
        details: async () =>
            UserMapper.details(await HttpClient.get(Endpoints.users.details(getUserId()))),
        settings: async () =>
            UserMapper.settings(await HttpClient.get(Endpoints.users.settings(getUserId()))),
        health: async () =>
            UserMapper.health(await HttpClient.get(Endpoints.users.health(getUserId()))),
    },
};