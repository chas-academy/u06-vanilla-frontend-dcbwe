import { ApiService, Buttons, ContentButton } from "../app/index.js";
import { Profile } from "./profile.js";
import { Health } from "./health.js";
import { Settings } from "./settings.js";
import { Landing } from "./landing.js";

export const Dashboard = (render) => {
    const html = `
        <section class="center">
            <div class="dashboard">
                <button id="btn-profile" class="btn">
                    <span class="btn__icon"></span>
                    <span class="btn__label"></span>
                </button>
                <button id="btn-health" class="btn">
                    <span class="btn__icon"></span>
                    <span class="btn__label"></span>
                </button>
                <button id="btn-settings" class="btn">
                    <span class="btn__icon"></span>
                    <span class="btn__label"></span>
                </button>
                <button id="btn-logout" class="btn">
                    <span class="btn__icon">
                    </span><span class="btn__label"></span>
                </button>
            </div>
        </section>
    `;

    const init = (root) => {
        Buttons.resetAll();

        ContentButton(root, "btn-profile", {
            icon: "./icons/user.svg",
            label: "profile",
            onClick: () => render(Profile),
        });

        ContentButton(root, "btn-health", {
            icon: "./icons/health.svg",
            label: "health",
            onClick: () => render(Health),
        });

        ContentButton(root, "btn-settings", {
            icon: "./icons/settings.svg",
            label: "settings",
            onClick: () => render(Settings),
        });

        ContentButton(root, "btn-logout", {
            icon: "./icons/logout.svg",
            label: "logout",
            onClick: () => {
                ApiService.logout();
                render(Landing);
            },
        });
    };

    return { html, init };
};
