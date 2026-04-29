import addHistory from "./eventHandlers/addHistory.js";
import factorial from "./factorial.js";
import { setDisplayValue } from "./inputHandlers/index.js";

export default function evaluatePostfix(array : Array<string | number> = []) {
    const addition = () =>
        result.push((result.pop() ?? 0) + (result.pop() ?? 0));

    const multiplication = () =>
        result.push((result.pop() ?? 0) * (result.pop() ?? 0));

    const log = () => result.push(Math.log10(result.pop() ?? 0));

    const ln = () => result.push(Math.log(result.pop() ?? 0));

    const sqrt = () => result.push(Math.sqrt(result.pop() ?? 0));

    const abs = () => result.push(Math.abs(result.pop() ?? 0));

    const fact = () => result.push(factorial(result.pop() ?? 0));

    const subtraction = () => {
        let o2 = result.pop() ?? 0;
        let o1 = result.pop() ?? 0;
        result.push(o1 - o2);
    };

    const division = () => {
        let o2 = result.pop() ?? 0;
        let o1 = result.pop() ?? 0;
        result.push(o1 / o2);
    };

    const mod = () => {
        let o2 = result.pop() ?? 0;
        let o1 = result.pop() ?? 0;
        result.push(o1 % o2);
    };

    const order = () => {
        let o2 = result.pop() ?? 0;
        let o1 = result.pop() ?? 0;
        result.push(o1 ** o2);
    };

    let result: Array<number> = [];
    for (let ele of array) {
        if (typeof ele !== "number") {
            switch (ele) {
                case "+":
                    addition();
                    break;

                case "-":
                    subtraction();
                    break;

                case "*":
                    multiplication();
                    break;

                case "/":
                    division();
                    break;

                case "%":
                    mod();
                    break;

                case "^":
                    order();
                    break;

                case "log":
                    log();
                    break;

                case "ln":
                    ln();
                    break;

                case "sqrt":
                    sqrt();
                    break;

                case "abs":
                    abs();
                    break;

                case "!":
                    fact();
                    break;

                default:
                    throw new SyntaxError("Add valid characters");
            }
        } else {
            result.push(ele);
        }
    }

    if (
        result.length !== 1 ||
        typeof result[0] !== "number" ||
        isNaN(result[0])
    ) {
        throw new SyntaxError("Enter Valid expression");
    }

    addHistory(String(result[0]));
    setDisplayValue(String(result[0]));
}
