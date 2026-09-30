(function () {
    const THEMES = ["home", "schedule", "infra", "food", "team"];

    const PAGE_THEME = {
        "index.html": "home",
        "schedule.html": "schedule",
        "infrastructure.html": "infra",
        "food.html": "food",
        "about.html": "team",
        "team.html": "team"
    };

    const FALLBACK_IMAGES = {
        home: "images/background2.jpeg",
        schedule: "images/schedule.jpeg",
        infra: "images/infrastructure.jpeg",
        food: "images/schedule.jpeg",
        team: "images/about.jpeg"
    };

    const CUSTOM_BACKGROUNDS = {
        home: "images/background2.jpeg",
        schedule: "images/schedule.jpeg",
        infra: "images/infrastructure.jpeg",
        food: "images/schedule.jpeg",
        team: "images/about.jpeg"
    };

    function currentFile() {
        const parts = window.location.pathname.split("/").filter(Boolean);
        let file = parts[parts.length - 1] || "index.html";
        if (!file.includes(".")) {
            file += ".html";
        }
        return file;
    }

    function assetUrl(path) {
        if (!path) {
            return "";
        }
        const inPages = window.location.pathname.includes("/pages/");
        return (inPages ? "../" : "") + path;
    }

    function pageTheme() {
        return PAGE_THEME[currentFile()] || "home";
    }

    function setVisibleTheme(name) {
        const theme = THEMES.includes(name) ? name : "home";
        document.body.dataset.theme = theme;
        document.querySelectorAll(".bg-layer").forEach((layer) => {
            layer.classList.toggle("is-visible", layer.dataset.theme === theme);
        });
    }

    function loadLayerImage(layer, theme) {
        const customPath = CUSTOM_BACKGROUNDS[theme];
        const fallback = FALLBACK_IMAGES[theme];
        const apply = (url) => {
            layer.style.backgroundImage = `url("${url}")`;
        };

        if (!customPath) {
            apply(fallback);
            return;
        }

        const customUrl = assetUrl(customPath);
        const probe = new Image();
        probe.onload = () => apply(customUrl);
        probe.onerror = () => apply(fallback);
        probe.src = customUrl;
    }

    function buildBackgroundLayers() {
        const stack = document.querySelector(".background");
        if (!stack) {
            return;
        }

        THEMES.forEach((theme) => {
            const layer = document.createElement("div");
            layer.className = "bg-layer";
            layer.dataset.theme = theme;
            loadLayerImage(layer, theme);
            stack.appendChild(layer);
        });
    }

    function wireNavPreview(activeTheme) {
        const navbar = document.querySelector(".navbar");
        const navItems = document.querySelectorAll(".nav-item");

        navItems.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                setVisibleTheme(item.dataset.theme || activeTheme);
            });
            item.addEventListener("focus", () => {
                setVisibleTheme(item.dataset.theme || activeTheme);
            });
        });

        if (navbar) {
            navbar.addEventListener("mouseleave", () => {
                setVisibleTheme(activeTheme);
            });
        }
    }

    function revealCards() {
        document.querySelectorAll(".reveal").forEach((card, index) => {
            window.setTimeout(() => {
                card.style.transition = "opacity 0.7s ease, transform 0.7s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, index * 120);
        });
    }

    function useImageFallbacks() {
        document.querySelectorAll("img[data-fallback]").forEach((img) => {
            const tryFallback = () => {
                const fallback = img.getAttribute("data-fallback");
                if (fallback && img.src !== fallback) {
                    img.src = fallback;
                }
            };
            img.addEventListener("error", tryFallback);
            if (img.complete && img.naturalWidth === 0) {
                tryFallback();
            }
        });
    }

    const activeTheme = pageTheme();
    document.body.dataset.page = activeTheme;
    buildBackgroundLayers();
    setVisibleTheme(activeTheme);
    wireNavPreview(activeTheme);
    useImageFallbacks();
    revealCards();
})();
