const sel= document.querySelector(".responsive");
const ul = document.querySelector("nav ul");
const nav= document.querySelector("nav");

sel.addEventListener("click", () => {
    ul.classList.toggle("show");
});
const navLink = document.querySelectorAll(".list");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);