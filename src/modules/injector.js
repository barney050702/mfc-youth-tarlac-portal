


export function injectComponents() {
    const components = [];

    components.forEach(({ id, html }) => {
        const container = document.getElementById(id);
        if (container) {
            container.outerHTML = html;
        } else {
            console.warn(`Could not find container for injection: ${id}`);
        }
    });
}
