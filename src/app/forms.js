export const FormHelper = {
    fill: (inputs, data) => {
        inputs.forEach((input) => { input.value = data[input.id] ?? ""; });
    },
    read: (inputs) => {
        const result = {};
        inputs.forEach((input) => { result[input.id] = input.value; });
        return result;
    },
    disable: (inputs, flag) => {
        inputs.forEach((input) => (input.disabled = flag));
    },
    init: (root, formId, statusId) => {
        const form = root.querySelector(`#${formId}`);
        const status = root.querySelector(`#${statusId}`);
        const inputs = Array.from(form.querySelectorAll("input, select"));
        const setStatus = (msg) => (status.textContent = msg);
        return { form, status, inputs, setStatus };
    },
};