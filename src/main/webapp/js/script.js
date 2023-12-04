const sc = new SquareCanvas("#graph");
const tm = document.querySelector("#history")
const form = document.querySelector("#request-form");

function gather() {
    let data = formDataToObject(new FormData(form));
    data.y = data.y.replace(",", ".")
    if (Array.isArray(data.r)) {
        data.r = data.r[0];
    }
    return data
}

function draw({r}) {
    sc.updateArea();
    sc.ctx.lineWidth = 3;

    // Прямоугольник в первой четверти
    sc.line(50, 30, 90, 30);
    sc.line(50, 50, 50, 30);
    sc.line(90, 50, 90, 30);

    // Треугольник в третьей четверти
    sc.line(50, 70, 10, 50);
    sc.line(10, 50, 50, 50);

    // Четверть круга в четвертой четверти
    sc.ctx.beginPath();
    sc.ctx.arc(223, 223, 175, 0, 0.5 * Math.PI, false);
    sc.ctx.lineTo(223, 223);
    sc.ctx.lineTo(398, 223);
    sc.ctx.stroke();

    sc.ctx.fillStyle = '#A9A9A9';
    sc.ctx.strokeStyle = '#000000'
    sc.ctx.stroke();
    sc.ctx.closePath();
    sc.ctx.lineWidth = 1;

    let R = (isNaN(r / 1)) ? "R" : r;
    let R2 = (isNaN(r / 2)) ? "R/2" : r / 2;

    sc.line(0, 50, 100, 50); // Ox
    sc.line(50, 0, 50, 100); // Oy

    sc.line(10, 48.5, 10, 51.5); // | -R
    sc.fillText(`-${R}`, 11, 48.5, 0.8);

    sc.line(30, 48.5, 30, 51.5); // | -R/2
    sc.fillText(`-${R2}`, 31, 48.5, 0.8);

    sc.line(90, 48.5, 90, 51.5); // | R
    sc.fillText(`${R}`, 91, 48.5, 0.8);

    sc.line(70, 48.5, 70, 51.5); // | R/2
    sc.fillText(`${R2}`, 71, 48.5, 0.8);

    sc.line(48.5, 10, 51.5, 10); // - R
    sc.fillText(`${R}`, 52, 11, 0.8);

    sc.line(48.5, 30, 51.5, 30); // - R/2
    sc.fillText(`${R2}`, 52, 31, 0.8);

    sc.line(48.5, 70, 51.5, 70); // - -R/2
    sc.fillText(`-${R2}`, 52, 71, 0.8);

    sc.line(48.5, 90, 51.5, 90); // - -R
    sc.fillText(`-${R}`, 52, 91, 0.8);

    sc.line(48.5, 3, 50, 0);  // /\
    sc.line(51.5, 3, 50, 0);  // ||
    sc.fillText("y", 45, 4);

    sc.line(97, 51.5, 100, 50);
    sc.line(97, 48.5, 100, 50); // ->
    sc.fillText("x", 95, 47);
    dotArray.forEach((dot, index) => {
        sc.fillText(`${dotArray.length-index}`, dot.x+0.5, dot.y-0.5, 0.8);
        sc.dot(dot.x, dot.y, "#000000")
    })
}

let dotArray = [];

function submit({x, y, r}, graphMode = false) {
    const check = (e, condition) => {
        (condition) ? e.style.color = "black" : e.style.color = "red";
        return condition;
    }
    let valid = check(document.querySelector("#r-label"), r && !isNaN(r));
    if (!graphMode) {
        valid = check(document.querySelector("#y-label"), y !== '' && !isNaN(y) && y.slice(0, 17) > -3 && y.slice(0, 17) < 5) && valid;
        valid = check(document.querySelector("#x-label"), x !== '' && !isNaN(x)) && valid;
    } else {
        document.querySelector("#y-label").style.color = "black";
        document.querySelector("#x-label").style.color = "black";
    }
    if (valid) {
        const queryString = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(r)}&function=check&dot=${graphMode}`;
        const url = `${contextPath}?${queryString}`;
        if (!graphMode) {
            dotArray.push({ x: parseFloat(x)*40/r+50, y: -parseFloat(y)*40/r+50 });
        }
        get_request(url, (html) => {
            tm.innerHTML = html;
            window.location.href = "result.jsp";
        });
    }
    return valid;
}

sc.onclick = (e) => {
    if (rValid) {
        rRadios.forEach(rRadio => rRadio.setCustomValidity(''));
        let dot = gather();
        dot.x = (e.x / 100 - 0.5) * 10 / 4 * dot.r;
        dot.y = (-e.y / 100 + 0.5) * 10 / 4 * dot.r;
        if (submit(dot, true)) {
            dotArray.push({x: e.x, y: e.y})
        }
    } else {
        rRadios.forEach(rRadio => rRadio.setCustomValidity('Проверьте значение - R'));
    }
    rRadios[0].reportValidity();
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});

let oldR = 1
window.addEventListener("load", () => {
    let dataFromLocalStorage = localStorage.getItem("dots");
    if (dataFromLocalStorage) {
        let parsedData = JSON.parse(dataFromLocalStorage);
        if (parsedData.hasOwnProperty("r")) {
            oldR = parsedData.r;
        }
        if (parsedData.hasOwnProperty("dots")) {
            dotArray = parsedData.dots;
        }
    }
    draw(gather());
});

window.addEventListener("unload", () => {
    const dataToSave = {
        r: oldR,
        dots: dotArray
    };
    localStorage.setItem("dots", JSON.stringify(dataToSave));
})

window.addEventListener("resize", () => draw(gather()));

form.querySelectorAll("input[name=r]").forEach(input => {
    input.addEventListener("change", () => {
        if (rValid) {
            const newR = input.value;
            dotArray.forEach(dot => {
                dot.x = (dot.x-50) * oldR / newR + 50;
                dot.y = (dot.y-50) * oldR / newR + 50;
            });
            oldR = newR;
            draw(gather());
        }
    });
});

document.querySelector("#clear-request")
    .addEventListener("click", () =>
        post_request(`${contextPath}`, (content) => {
            tm.innerHTML = content
            dotArray = []
            draw(gather())
        }, {function: "clear"}));


form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit(gather())
})
// Отправка запроса на очистку таблицы
document.getElementById('clear-request').addEventListener('click', function() {
    fetch('', {
        method: 'POST',
        body: 'function=clear',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Ошибка при очистке таблицы');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
});


