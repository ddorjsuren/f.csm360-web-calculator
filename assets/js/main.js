const display = document.querySelector(".display");

let number1 = 0;
let operator = "";
let isStartNumber = true;

function getDisplay() {
    return display.value;
}

function setDisplay(val) {
    display.value = val;
}

function formatResult(val) {
    /*
    If the result is a whole number strip the decimal portion
    otherwise return the full decimal string
    */
    if (val % 1 === 0) {
        return String(Math.trunc(val));
    }
    return String(val);
}

function isError() {
    return getDisplay() === "Error";
}

document.querySelectorAll(".number").forEach(btn => {
    btn.addEventListener("click", () => {
        const num = btn.textContent;

        if (isStartNumber) {
            setDisplay(num);
            isStartNumber = false;
        } else {
            if (num === "." && getDisplay().includes(".")) return;
            setDisplay(getDisplay() + num);
        }
    });
});

document.querySelectorAll(".operator:not(.equals)").forEach(btn => {
    btn.addEventListener("click", () => {
        const current = getDisplay();
        if (!current || isError()) return;

        number1 = parseFloat(current);
        operator = btn.dataset.op;
        isStartNumber = true;
    });
});

document.querySelector(".equals").addEventListener("click", () => {
    const current = getDisplay();
    if (!operator || !current || isError()) return;

    const number2 = parseFloat(current);
    let result;

    switch (operator) {
        case "+": result = number1 + number2; break;
        case "-": result = number1 - number2; break;
        case "*": result = number1 * number2; break;
        case "/":
            if (number2 === 0) {
                setDisplay("Error");
                operator = "";
                isStartNumber = true;
                return;
            }
            result = number1 / number2;
            break;
    }

    setDisplay(formatResult(result));
    operator = "";
    isStartNumber = true;
});

document.querySelector("#btnClear").addEventListener("click", () => {
    setDisplay("0");
    number1 = 0;
    operator = "";
    isStartNumber = true;
});

document.querySelector("#btnPlusMinus").addEventListener("click", () => {
    const current = getDisplay();
    if (!current || current === "0" || isError()) return;

    const val = parseFloat(current) * -1;
    setDisplay(formatResult(val));
});

document.querySelector("#btnSqrt").addEventListener("click", () => {
    const current = getDisplay();
    if (!current || current === "0" || isError()) return;

    const val = parseFloat(current);
    if (val < 0) {
        setDisplay("Error");
        operator = "";
        isStartNumber = true;
        return;
    }
    setDisplay(String(Math.sqrt(val)));
});

document.querySelector("#btnSquare").addEventListener("click", () => {
    const current = getDisplay();
    if (!current || current === "0" || isError()) return;

    const val = parseFloat(current);
    setDisplay(String(Math.pow(val, 2)));
});

document.querySelector("#btnSin").addEventListener("click", () => {
    const current = getDisplay();
    if (!current || current === "0" || isError()) return;

    setDisplay(String(Math.sin(parseFloat(current))));
});

document.querySelector("#btnCos").addEventListener("click", () => {
    const current = getDisplay();
    if (!current || current === "0" || isError()) return;

    setDisplay(String(Math.cos(parseFloat(current))));
});

document.querySelector("#btnTan").addEventListener("click", () => {
    const current = getDisplay();
    if (!current || current === "0" || isError()) return;

    setDisplay(String(Math.tan(parseFloat(current))));
});

/*
Button press visual feedback mirrors the JavaFX onButtonPressed and onButtonReleased handlers
Using mousedown and mouseup instead of just active to match the original behavior
*/
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mousedown", () => btn.classList.add("pressed"));
    btn.addEventListener("mouseup", () => btn.classList.remove("pressed"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("pressed"));
});