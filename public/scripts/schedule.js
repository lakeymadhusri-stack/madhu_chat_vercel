const search = document.getElementById("search");
const rows = [...document.querySelectorAll("#schedule tbody tr")];

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    rows.forEach((row) => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
});

function highlightCurrentTime() {
    rows.forEach((row) => row.classList.remove("active"));
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const ranges = [
        [555, 660],
        [660, 675],
        [675, 780],
        [840, 960],
        [975, 1020],
        [1020, 1080]
    ];

    ranges.forEach((range, index) => {
        if (minutes >= range[0] && minutes < range[1]) {
            rows[index].classList.add("active");
        }
    });
}

highlightCurrentTime();
setInterval(highlightCurrentTime, 60000);
