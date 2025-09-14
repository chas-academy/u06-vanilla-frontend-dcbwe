import { loadSvg } from "./dom.js";

const refs = {
    back: document.querySelector("#btn-back"),
    one: document.querySelector("#btn-one"),
    two: document.querySelector("#btn-two"),
};

const resetAll = () => {
    Object.entries(refs).forEach(([key, value]) => { value.hidden = true; });
};

const setButton = (btn, { icon, label, onClick }) => {
    loadSvg(btn.querySelector(".btn__icon"), icon);
    if (label) btn.querySelector(".btn__label").textContent = label;
    btn.onclick = onClick;
    btn.hidden = false;
};

export const ContentButton = (root, id, { icon, label, onClick }) => {
    const btn = root.querySelector(`#${id}`);
    loadSvg(btn.querySelector(".btn__icon"), icon);
    btn.querySelector(".btn__label").textContent = label;
    btn.addEventListener("click", onClick);
};

export const Buttons = {
    resetAll,
    back: {
        default: (target) =>
            setButton(refs.back, {
                icon: "./icons/return.svg",
                onClick: () => target(),
            }),
    },
    btnOne: {
        home: (target) =>
            setButton(refs.one, {
                icon: "./icons/home.svg",
                label: "home",
                onClick: () => target(),
            }),
        save: (isSave) =>
            setButton(refs.one, {
                icon: "./icons/check-save.svg",
                label: "save",
                onClick: isSave,
            }),
    },
    btnTwo: {
        edit: (isEdit) =>
            setButton(refs.two, {
                icon: "./icons/pencil.svg",
                label: "edit",
                onClick: isEdit,
            }),
        cancel: (isCancel) =>
            setButton(refs.two, {
                icon: "./icons/check-cancel.svg",
                label: "cancel",
                onClick: isCancel,
            }),
    },
};