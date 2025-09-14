export async function loadSvg(svgElement, path) {
    const response = await fetch(path);
    svgElement.innerHTML = await response.text();
}

export function render(Component) {
    const slot = document.querySelector("[data-slot='content']");
    const component = Component(render);
    slot.innerHTML = component.html;
    component.init(slot);
}




