const display = document.querySelector(".display");

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
    return getDisplay() === "Алдаа";
}
function appendToDisplay(val) {
    /*
    If the display shows 0 or an error replace it entirely
    otherwise append to the existing expression
    */
    if (getDisplay() === "0" || isError()) {
        setDisplay(val);
    } else {
        setDisplay(getDisplay() + val);
    }
}


document.querySelectorAll(".number").forEach(btn => {
    btn.addEventListener("click", () => {
        appendToDisplay(btn.textContent);
    });
});

document.querySelectorAll(".operator:not(.equals)").forEach(btn => {
    btn.addEventListener("click", () => {
        appendToDisplay(btn.dataset.op);
    });
});

document.querySelector(".equals").addEventListener("click", () => {
    try {
        const result = eval(getDisplay());
        setDisplay(String(result));
    } catch {
        setDisplay("Error");
    }
});

document.querySelector("#btnClear").addEventListener("click", () => {
    setDisplay("0");
});

document.querySelector("#btnPlusMinus").addEventListener("click", () => {
    if (isError()) return;
    setDisplay("-("+getDisplay()+")");
});


document.querySelector("#btnSqrt").addEventListener("click", () => {
    if (isError()) return;
    try {
        const val = eval(getDisplay());
        if (val < 0) {
            setDisplay("Error");
            return;
        }
        setDisplay(String(Math.sqrt(val)));
    } catch {
        setDisplay("Error");
    }
});


document.querySelector("#btnSquare").addEventListener("click", () => {
    if (isError()) return;
    try {
        const val = eval(getDisplay());
        setDisplay(String(Math.pow(val, 2)));
    } catch {
        setDisplay("Error");
    }
});

document.querySelector("#btnSin").addEventListener("click", () => {
    if (isError()) return;
    try {
        setDisplay(String(Math.sin(eval(getDisplay()))));
    } catch {
        setDisplay("Error");
    }
});

document.querySelector("#btnCos").addEventListener("click", () => {
    if (isError()) return;
    try {
        setDisplay(String(Math.cos(eval(getDisplay()))));
    } catch {
        setDisplay("Error");
    }
});

document.querySelector("#btnTan").addEventListener("click", () => {
    if (isError()) return;
    try {
        setDisplay(String(Math.tan(eval(getDisplay()))));
    } catch {
        setDisplay("Error");
    }
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