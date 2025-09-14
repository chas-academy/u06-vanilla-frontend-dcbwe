import { ApiService, Buttons, FormHelper } from "../app/index.js";
import { Login } from "./login.js";

export const Verify = (render) => {
    const html = `
        <section class="center">
            <h2>verify account</h2>
            <form id="verifyForm">
                <input id="password" type="password" placeholder="password" required>
                <button class="submit-btn" type="submit">verify</button>
            </form>
            <p id="verifyStatus"></p>
        </section>
    `;

    const init = (root) => {
        const { form, inputs, setStatus } =
            FormHelper.init(root, "verifyForm", "verifyStatus");

        Buttons.resetAll();

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const { password } = FormHelper.read(inputs);
            try {
                const message = await ApiService.verify(password);
                setStatus(message);
                render(Login);
            } catch (err) {
                setStatus("error verifying: " + err.message);
            }
        });
    };

    return { html, init };
};
