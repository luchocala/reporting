export function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

export function setTheme(nextDark) {
  document.documentElement.classList.toggle("dark", nextDark);
  localStorage.setItem("theme", nextDark ? "dark" : "light");
  window.dispatchEvent(
    new CustomEvent("themechange", {
      detail: { dark: nextDark },
    })
  );
}

export function toggleTheme() {
  setTheme(!isDarkTheme());
}
