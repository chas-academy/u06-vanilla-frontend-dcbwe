import { ApiService, Buttons, FormHelper } from "../app/index.js";
import { Landing } from "./landing.js";
import { Dashboard } from "./dashboard.js";

export const Login = (render) => {
    const html = `
        <section class="center">
            <h2>please login</h2>
            <form id="loginForm">
                <input id="email" type="email" placeholder="email" required>
                <input id="password" type="password" placeholder="password" required>
                <button class="submit-btn" type="submit">login</button>
            </form>
            <p id="loginStatus"></p>
        </section>
    `;

    const init = (root) => {
        const { form, inputs, setStatus } =
            FormHelper.init(root, "loginForm", "loginStatus");

        Buttons.resetAll();
        Buttons.back.default(() => render(Landing));

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const { email, password } = FormHelper.read(inputs);
            try {
                await ApiService.login(email, password);
                render(Dashboard);
                Buttons.resetAll();
            } catch (err) {
                setStatus("error: " + err.message);
            }
        });
    };

    return { html, init };
};
