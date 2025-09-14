import { ApiService, Buttons, FormHelper } from "../app/index.js";
import { Dashboard } from "./dashboard.js";

export const Profile = (render) => {
    const html = `
        <section class="center">
            <h2>profile</h2>
            <form id="profileForm">
                <input id="firstname" type="text" placeholder="firstname" required>
                <input id="lastname" type="text" placeholder="lastname" required>
                <input id="birthYear" type="text" placeholder="year of birth" required>
                <select id="gender" required>
                    <option value="">-- select gender --</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <input id="city" type="text" placeholder="city" required>
                <input id="country" type="text" placeholder="country" required>
            </form>
            <p id="profileStatus"></p>
        </section>
    `;

    const init = async (root) => {
        const { inputs, setStatus } =
            FormHelper.init(root, "profileForm", "profileStatus");

        const loadProfile = async () => {
            try {
                const profile = await ApiService.fetch.profile();
                FormHelper.fill(inputs, profile);
            } catch (err) {
                console.log("can't load profile: ", err.message);
                FormHelper.disable(inputs, true);
            }
        };

        await loadProfile();

        const setViewMode = () => {
            FormHelper.disable(inputs, true);
            Buttons.resetAll();
            Buttons.btnOne.home(() => render(Dashboard));
            Buttons.btnTwo.edit(() => setEditMode());
        };

        const setEditMode = () => {
            FormHelper.disable(inputs, false);
            Buttons.resetAll();

            Buttons.btnTwo.cancel(async () => {
                await loadProfile();
                setViewMode();
            });

            Buttons.btnOne.save(async () => {
                const newData = FormHelper.read(inputs);
                try {
                    await ApiService.update.profile(newData);
                    setStatus("saved!");
                    await loadProfile();
                    setViewMode();
                } catch (err) {
                    setStatus("error saving: " + err.message);
                }
            });
        };

        setViewMode();
    };

    return { html, init };
};
