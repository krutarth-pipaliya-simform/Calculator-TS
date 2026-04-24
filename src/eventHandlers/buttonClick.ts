import calculate from "../calculate.js";
import {
    appendDisplayValue,
    clearDisplayValue,
    deleteDisplayValue,
    displayString,
    setDisplayValue,
} from "../inputHandlers/index.js";

export default function buttonClick(e: Event) {
    if (!e.target) return;
    if (!(e.target instanceof HTMLElement)) return;
    const value = e.target.getAttribute("appendable");
    if (e.target.classList[0] === "operations-button") {
        switch (value) {
            case "CLEAR":
                clearDisplayValue();
                break;

            case "DELETE":
                deleteDisplayValue();
                break;

            case "CALCULATE":
                try {
                    calculate(displayString);
                    break;
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        alert(error.message);
                        setDisplayValue(error.message);
                    }
                } finally {
                    break;
                }

            default:
                appendDisplayValue(value ?? "");
                break;
        }
    }
}
