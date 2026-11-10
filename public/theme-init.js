try {
  var theme = localStorage.getItem("portfolio-theme") || "light";
  if (theme !== "dark") theme = "light";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
} catch (error) {
  document.documentElement.dataset.theme = "light";
}
