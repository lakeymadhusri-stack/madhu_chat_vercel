const navbar = document.querySelector(".navbar");
const glow = document.querySelector(".nav-glow");
const navItems = document.querySelectorAll(".nav-item");


// =================================
// Mouse-following glass glow
// =================================

navbar.addEventListener("mousemove", (event) => {

    const rect = navbar.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;

});


navbar.addEventListener("mouseleave", () => {

    glow.style.opacity = "0";

});


navbar.addEventListener("mouseenter", () => {

    glow.style.opacity = "1";

});


// =================================
// Navigation active effect
// =================================

function normalizePath(pathname) {
    let path = pathname.replace(/\/+$/, "") || "/";
    if (path === "/") {
        return "/index.html";
    }
    if (!/\.[a-zA-Z0-9]+$/.test(path)) {
        path += ".html";
    }
    return path;
}

const currentPage = normalizePath(window.location.pathname);

navItems.forEach((item) => {
    const destination = new URL(item.href, window.location.href);
    const destinationPath = normalizePath(destination.pathname);

    if (destinationPath === currentPage) {
        item.classList.add("active");
        item.setAttribute("aria-current", "page");
    } else {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
    }
});


// =================================
// Small 3D movement
// =================================

navbar.addEventListener("mousemove", (event) => {

    const rect = navbar.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY =
        ((x / rect.width) - 0.5) * 3;

    const rotateX =
        ((y / rect.height) - 0.5) * -3;

    navbar.style.transform =
        `translateX(-50%) 
         perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

});


navbar.addEventListener("mouseleave", () => {

    navbar.style.transform =
        "translateX(-50%) perspective(1000px) rotateX(0deg) rotateY(0deg)";

});