(function () {
    const symbols = {
        POORI: "🫓",
        ALOO: "🥔",
        IDLY: "🍚",
        KOBBARI: "🥥",
        CHUTNEY: "🥥",
        BIRYANI: "🍛",
        CHICKEN: "🍗",
        RICE: "🍚",
        DAL: "🍲",
        RASAM: "🍵",
        PICKLE: "🥒",
        BANANA: "🍌",
        TEA: "☕",
        MILK: "🥛",
        PAVASAM: "🍮",
        PAYASAM: "🍮",
        VEG: "🥬",
        SAMBAR: "🍲",
        PAPADS: "🫓",
        PAPAD: "🫓"
    };

    document.querySelectorAll(".food-item[data-name]").forEach((item) => {
        const name = (item.dataset.name || "").toUpperCase();
        const symbol = Object.keys(symbols).find((key) => name.includes(key));
        if (!symbol) {
            return;
        }
        const holder = item.querySelector(".sym");
        if (holder && !holder.textContent.trim()) {
            holder.textContent = symbols[symbol];
        }
    });
})();
