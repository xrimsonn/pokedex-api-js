document.addEventListener("DOMContentLoaded", function() {
  const themeButton = document.getElementById("themeButton");
  const themeStatus = document.getElementById("themeStatus");
  const htmlElement = document.documentElement;

  themeButton.addEventListener("click", function() {
    if (htmlElement.getAttribute("data-theme") === "light") {
      htmlElement.setAttribute("data-theme", "dark");
      themeStatus.textContent = "Dark";
    } else {
      htmlElement.setAttribute("data-theme", "light");
      themeStatus.textContent = "Light";
    }
  });
});