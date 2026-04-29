import { displayString } from "../inputHandlers/index.js";
import type { History } from "../types.js";

export default function addHistory(str = "") {
    const localHistory = localStorage.getItem("calculation-history");
    try {
        let history = localHistory
            ? (JSON.parse(localHistory) as Array<History>)
            : [];
        if (history) history.unshift([displayString, str]);
        localStorage.setItem("calculation-history", JSON.stringify(history));
        renderHistory();
    } catch (error) {
        if (error instanceof Error) console.log("error", error);
    }
}

export function renderHistory() {
    const localHistory = localStorage.getItem("calculation-history");
    try {
        let history = localHistory
            ? (JSON.parse(localHistory) as Array<History>)
            : ([] as Array<History>);

        let ul = document.querySelector(".history-list");
        if (ul) ul.innerHTML = "";
        for (let [expression, result] of history) {
            const li = document.createElement("li");
            li.className = "history-item";
            li.textContent = `${expression} = ${result}`;
            ul?.appendChild(li);
        }
    } catch (error) {
        if (error instanceof Error) console.log("error", error);
    }
}
