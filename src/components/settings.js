import { ApiService, Buttons, FormHelper } from "../app/index.js";
import { Dashboard } from "./dashboard.js";

export const Settings = (render) => {
    const html = `
        <section class="center">
            <h2>zettings</h2>
            <form id="settingsForm">
                <select id="units" required>
                    <option value="">-- select units --</option>
                    <option value="standard">standard</option>
                    <option value="us">us</option>
                </select>
                <select id="language" required>
                    <option value="">-- select language --</option>
                    <option value="sv">sv</option>
                    <option value="en">en</option>
                </select>
                <select id="darkMode" required>
                    <option value="">-- dark mode --</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
                <select id="notifications.email" required>
                    <option value="">-- notify email --</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
                <select id="notifications.sms" required>
                    <option value="">-- notify sms --</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </form>
            <p id="settingsStatus"></p>
        </section>
    `;

    const init = async (root) => {
        const { inputs, setStatus } =
            FormHelper.init(root, "settingsForm", "settingsStatus");

        const loadSettings = async () => {
            try {
                const settings = await ApiService.fetch.settings();
                FormHelper.fill(inputs, settings);
            } catch (err) {
                console.log("can't load settings: ", err.message);
                FormHelper.disable(inputs, true);
            }
        };

        await loadSettings();

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
                await loadSettings();
                setViewMode();
            });

            Buttons.btnOne.save(async () => {
                const newData = FormHelper.read(inputs);
                try {
                    await ApiService.update.settings(newData);
                    setStatus("saved!");
                    await loadSettings();
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
