export const getBearer = () =>
    Session.get("bearerToken")
        ? { Authorization: `Bearer ${Session.get("bearerToken")}` }
        : {};

export const getUserId = () => {
    const user = Session.get("user");
    return user.id;
};

const SessionEnv = {
    KEY: "user.session",
    read: () => JSON.parse(localStorage.getItem(SessionEnv.KEY) || "{}"),
    write: (obj) => localStorage.setItem(SessionEnv.KEY, JSON.stringify(obj)),
};

export const Session = {
    set: (key, value) => SessionEnv.write({ ...SessionEnv.read(), [key]: value }),
    update: (patch) => SessionEnv.write({ ...SessionEnv.read(), ...patch }),
    get: (key) => SessionEnv.read()[key] ?? null,
    clear: () => SessionEnv.write({}),
};