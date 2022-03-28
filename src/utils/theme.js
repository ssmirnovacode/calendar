export const initTheme = settings => {

    const root = document.querySelector(':root');
    const properties = Object.keys(settings);

    properties.forEach(prop => {
        root.style.setProperty(`--${prop}`, settings[prop]);
    })
}