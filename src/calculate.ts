import evaluatePostfix from "./evaluatePostfix.js";
import type { Operator } from "./types.js";

const precedence: Map<Operator, number> = new Map([
    ["-", 1],
    ["+", 1],
    ["*", 2],
    ["/", 2],
    ["%", 3],
    ["!", 4],
    ["^", 5],
    ["log", 6],
    ["ln", 6],
    ["abs", 6],
    ["(", 0],
    [")", -1],
]);

export default function calculate() {
    let inputTag = document.querySelector(
        ".main-input-display > input",
    ) as HTMLInputElement;

    let str = inputTag.value;
    let operators: Array<string> = [],
        operands: Array<string | number> = [];
    let operand = "";

    const drainStack = (bracketFlag = false) => {
        while (operators.length) {
            if (bracketFlag && operators[operators.length - 1] === "(") {
                operators.pop();
                return true;
            }
            let popped = operators.pop();
            if (popped) operands.push(popped);
        }
    };

    for (let i = 0; i < str.length; i++) {
        while (
            (str.length > i &&
                str.charCodeAt(i) >= "0".charCodeAt(0) &&
                str.charCodeAt(i) <= "9".charCodeAt(0)) ||
            str[i] === "."
        ) {
            operand += str[i];
            i++;
        }

        if (operand != "") {
            operands.push(+operand);
            operand = "";
        }

        let operator = "";
        if (i >= str.length) break;
        switch (str[i]) {
            case "l":
                if (str.slice(i, i + 3) === "log") {
                    operator = "log";
                    i += 2;
                } else if (str.slice(i, i + 2) === "ln") {
                    operator = "ln";
                    i += 1;
                }
                break;

            case "a":
                if (str.slice(i, i + 3) === "abs") {
                    operator = "abs";
                    i += 2;
                }
                break;

            case "s":
                if (str.slice(i, i + 4) === "sqrt") {
                    operator = "sqrt";
                    i += 3;
                    break;
                }
                break;

            case ")":
                if (drainStack(true) !== true) {
                    throw new SyntaxError("Enter Valid Parantheses pairs");
                }
                break;

            case "(":
                operators.push("(");
                break;

            default:
                let char = str[i];
                if (char && "+-*^/%!".indexOf(char) !== -1) {
                    operator = char;
                } else {
                    throw new SyntaxError("Enter valid characters only");
                }
                break;
        }

        while (
            operator != "" &&
            operators.length &&
            precedence.get(operators[operators.length - 1] as Operator)! >=
                precedence.get(operator as Operator)!
        ) {
            let val = operators[operators.length - 1];
            let popped = operators.pop();
            if (popped) operands.push(popped);
        }

        if (operator) {
            operators.push(operator);
        }
    }
    if (operand != "") {
        operands.push(+operand);
        operand = "";
    }
    drainStack();
    evaluatePostfix(operands);
}
