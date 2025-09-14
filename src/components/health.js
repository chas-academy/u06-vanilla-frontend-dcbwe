import { ApiService, Buttons, FormHelper } from "../app/index.js";
import { Dashboard } from "./dashboard.js";

export const Health = (render) => {
    const html = `
        <section class="center">
            <h2>health details</h2>
            <form id="healthForm">
                <input id="height" type="text" placeholder="height [cm]" required>
                <input id="weight" type="text" placeholder="weight [kg]" required>
                <select id="dailyRoutine" required>
                    <option value="">-- select routine --</option>
                    <option value="sitting">sitting</option>
                    <option value="sitting and standing">sitting and standing</option>
                    <option value="standing and moving">standing and moving</option>
                    <option value="standing, moving and lifting">standing, moving and lifting</option>
                    <option value="moving">moving</option>
                    <option value="moving and lifting">moving and lifting</option>
                </select>
                <select id="trainingLevel" required>
                    <option value="">-- select training --</option>
                    <option value="0-1 day/week">0-1 day/week</option>
                    <option value="1-2 days/week">1-2 days/week</option>
                    <option value="2-4 days/week">2-4 days/week</option>
                    <option value="4-6 days/week">4-6 days/week</option>
                    <option value="7 days/week">7 days/week</option>
                </select>
            </form>
            <p id="healthStatus"></p>
            <div id="caloriesOutput" class="calories"></div>
        </section>
    `;

    const init = async (root) => {
        const { inputs, setStatus } =
            FormHelper.init(root, "healthForm", "healthStatus");
        const caloriesDiv = root.querySelector("#caloriesOutput");

        const loadHealth = async () => {
            try {
                const details = await ApiService.fetch.details();
                FormHelper.fill(inputs, details);
                const health = await ApiService.fetch.health();
                caloriesDiv.textContent = health?.calories
                    ? `daily calories: ${health.calories}`
                    : "";
            } catch (err) {
                console.log("can't load health/details: ", err.message);
                FormHelper.disable(inputs, true);
            }
        };

        await loadHealth();

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
                await loadHealth();
                setViewMode();
            });

            Buttons.btnOne.save(async () => {
                const newData = FormHelper.read(inputs);
                try {
                    await ApiService.update.details(newData); // uppdaterar endast details
                    setStatus("saved!");
                    await loadHealth();
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
