import buttonClick from "./eventHandlers/buttonClick.js";
import toggleHistory from "./eventHandlers/toggleHistory.js";

const btn = document.querySelector(".main-header-history");
if (btn instanceof HTMLButtonElement) {
    btn.addEventListener("click", toggleHistory);
}

const operations = document.querySelector(".buttons-grid-wrapper");
if (operations instanceof HTMLDivElement) {
    operations.addEventListener("click", buttonClick);
}
