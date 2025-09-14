import { Buttons, ContentButton } from "../app/index.js";
import { Signup } from "./signup.js";
import { Login } from "./login.js";

export const Landing = (render) => {
    const html = `
        <section class="center">
            <h2>u06</h2>
            <div class="dashboard landing">
                <button id="btn-go-login" class="btn">
                    <span class="btn__icon"></span>
                    <span class="btn__label"></span>
                </button>
                <button id="btn-go-signup" class="btn">
                    <span class="btn__icon"></span>
                    <span class="btn__label"></span>
                </button>
            </div>
        </section>
    `;

    const init = (root) => {
        Buttons.resetAll();

        ContentButton(root, "btn-go-login", {
            icon: "./icons/user.svg",
            label: "login",
            onClick: () => render(Login),
        });

        ContentButton(root, "btn-go-signup", {
            icon: "./icons/user-plus.svg",
            label: "signup",
            onClick: () => render(Signup),
        });
    };

    return { html, init };
};
