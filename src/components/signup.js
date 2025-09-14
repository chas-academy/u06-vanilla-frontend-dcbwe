import { ApiService, Buttons, FormHelper } from "../app/index.js";
import { Verify } from "./verify.js";
import { Landing } from "./landing.js";

export const Signup = (render) => {
    const html = `
        <section class="center">
            <h2>create an account</h2>
            <form id="signupForm">
                <input id="email" type="email" placeholder="email" required>
                <button class="submit-btn" type="submit">signup</button>
            </form>
            <p id="signupStatus"></p>
        </section>
    `;

    const init = (root) => {
        const { form, inputs, setStatus } =
            FormHelper.init(root, "signupForm", "signupStatus");

        Buttons.resetAll();
        Buttons.back.default(() => render(Landing));

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const { email } = FormHelper.read(inputs);
            try {
                await ApiService.signup(email);
                render(Verify);
            } catch (err) {
                setStatus("error signing up: " + err.message);
            }
        });
    };

    return { html, init };
};
