import { loadSvg } from "./dom.js";
import { Session } from "./session.js";

const THEME_KEY = "theme";
const THEME_ICONS = {
    light: "./icons/sun.svg",
    dark: "./icons/moon.svg",
};

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    Session.set(THEME_KEY, theme);
    const btn = document.querySelector("#btn-theme");
    loadSvg(btn.querySelector(".btn__icon"), THEME_ICONS[theme]);
};

const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
};

export const Theme = {
    init: () => {
        const saved = Session.get(THEME_KEY) || "light";
        setTheme(saved);
        const btn = document.querySelector("#btn-theme");
        btn.addEventListener("click", toggleTheme);
    },
};