export const initTheme = (settings: Record<string, string | undefined>) => {
  const root: HTMLElement = document.querySelector(":root")!;
  const properties = Object.keys(settings);

  properties.forEach((prop) => {
    const value = settings[prop];
    value && root.style.setProperty(`--${prop}`, value);
  });
};
