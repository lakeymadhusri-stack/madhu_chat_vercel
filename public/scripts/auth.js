(function () {
    const AUTH_KEY = "campusLoggedIn";
    const isLoggedIn =
        sessionStorage.getItem(AUTH_KEY) === "true" ||
        localStorage.getItem(AUTH_KEY) === "true";

    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const inPagesFolder = path.includes("/pages/");
    const isLoginPage = /login(\.html)?$/i.test(path) || path.endsWith("/login");

    const loginUrl = inPagesFolder ? "../login.html" : "login.html";
    const homeUrl = inPagesFolder ? "../index.html" : "index.html";

    if (isLoginPage) {
        if (isLoggedIn) {
            window.location.replace(homeUrl);
        }
        return;
    }

    if (!isLoggedIn) {
        window.location.replace(loginUrl);
    }
})();
