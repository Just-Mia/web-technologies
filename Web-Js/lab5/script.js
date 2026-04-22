
//зав 1
let isLampOn = false;
let inactivityTimer;
const INACTIVITY_LIMIT = 5 * 1000;

function applyLampType() {
    let type = document.getElementById("bulbType").value;

    if (!isLampOn) {
        lamp.style.background = "#555";
        return;
    }

    if (type == "Regular") {
        lamp.style.background = "yellow";

    }
    else if (type == "Energy-saving") {
        lamp.style.background = "lightyellow";

    }
    else if (type == "LED") {
        lamp.style.background = "white";
    }
}

function resetInactivity() {
    clearTimeout(inactivityTimer);
    if (isLampOn) {
        inactivityTimer = setTimeout(() => {
            isLampOn = false;
            updateBulbUI();
            alert("Auto-off: User inactive for ... minutes.");
            lamp.style.background = "#555";
        }, INACTIVITY_LIMIT);
    }
}

function toggleLamp() {
    isLampOn = !isLampOn;
    applyLampType()
    updateBulbUI();
    resetInactivity();
}

function updateBulbUI() {
    const lampEl = document.getElementById("lamp");
    const statusEl = document.getElementById("bulbStatus");
    if (isLampOn) {
        lampEl.classList.add("on");
        statusEl.innerText = "Status: ON (" + document.getElementById("bulbType").value + ")";
    } else {
        lamp.style.background = "#555";
        lampEl.classList.remove("on");
        lampEl.style.opacity = 1;
        statusEl.innerText = "Status: OFF";

    }
}

function setBrightness() {
    const type = document.getElementById("bulbType").value;
    if (type !== "LED") {
        alert("Brightness control is only available for LED bulbs!");
        return;
    }
    let val = prompt("Enter brightness (0.1 to 1.0):", "1.0");
    if (val !== null) document.getElementById("lamp").style.opacity = val;
    resetInactivity();
}

function resetBulb() {
    isLampOn = false;
    updateBulbUI();
}


//Зав 2



let durations = {
    red: 5000,
    yellow: 3000,
    green: 7000
};


const sequence = [
    { id: 'red', type: 'solid', label: 'RED' },
    { id: 'yellow', type: 'solid', label: 'YELLOW' },
    { id: 'green', type: 'solid', label: 'GREEN' },
    { id: 'yellow', type: 'blink', label: 'YELLOW' },
];

let currentIndex = 0;
let autoMode = false;
let mainTimer = null;
let blinkInterval = null;


const lights = {
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    green: document.getElementById('green')
};
const statusText = document.getElementById('state-description');
const timerText = document.getElementById('timer-display');



function clearAll() {
    Object.values(lights).forEach(l => l.classList.remove('active'));
    clearInterval(blinkInterval);
    clearTimeout(mainTimer);
}

function setLightState(step) {
    clearAll();
    const activeLight = lights[step.id];
    statusText.innerText = `Current State: ${step.label}`;

    if (step.type === 'blink') {
        let isOn = false;
        blinkInterval = setInterval(() => {
            isOn = !isOn;
            activeLight.classList.toggle('active', isOn);
        }, 400);
    } else {
        activeLight.classList.add('active');
    }
}

function nextManualState() {
    autoMode = false;
    currentIndex = (currentIndex + 1) % sequence.length;
    setLightState(sequence[currentIndex]);
    timerText.innerText = "Next change in: MANUAL MODE";
}

async function runAutoCycle() {
    autoMode = true;
    while (autoMode) {
        const step = sequence[currentIndex];
        setLightState(step);


        let currentDuration = durations[step.id] || 3000;


        let remaining = currentDuration / 1000;
        const updateCountdown = () => {
            if (!autoMode) return;
            timerText.innerText = `Next change in: ${remaining}s`;
            if (remaining > 0) {
                remaining--;
                mainTimer = setTimeout(updateCountdown, 1000);
            } else {
                currentIndex = (currentIndex + 1) % sequence.length;
                runAutoCycle();
            }
        };

        updateCountdown();
        break;
    }
}

function configureTimers() {
    const r = prompt("Enter Red duration (seconds):", durations.red / 1000);
    const y = prompt("Enter Yellow duration (seconds):", durations.yellow / 1000);
    const g = prompt("Enter Green duration (seconds):", durations.green / 1000);

    if (r) durations.red = r * 1000;
    if (y) durations.yellow = y * 1000;
    if (g) durations.green = g * 1000;

    alert("Durations updated!");
}

function stopReset() {
    autoMode = false;
    currentIndex = 0;
    clearAll();
    statusText.innerText = "Current State: STANDBY";
    timerText.innerText = "Next change in: --s";
}


document.getElementById('startBtn').addEventListener('click', () => {
    if (!autoMode) runAutoCycle();
});
document.getElementById('nextBtn').addEventListener('click', nextManualState);
document.getElementById('configBtn').addEventListener('click', configureTimers);
document.getElementById('stopBtn').addEventListener('click', stopReset);



//Завд 3




let clock = document.getElementById("clock");
let showSEC = true;

function updateClock() {
    let now = new Date();

    let h = String(now.getHours()).padStart(2, "0");
    let m = String(now.getMinutes()).padStart(2, "0");
    let s = String(now.getSeconds()).padStart(2, "0");

    
    let colon = ":";
    let sec = showSEC ? s : "   ";

    clock.innerText = `${h}${colon}${m}${colon}${sec}`;

    showSEC = !showSEC; 
}

setInterval(updateClock, 500);






document.getElementById("startTimer").addEventListener("click", () => {
    let end = new Date(document.getElementById("deadline").value);

    let interval = setInterval(() => {
        let now = new Date();
        let diff = end - now;

        if (diff <= 0) {
            clearInterval(interval);
            document.getElementById("timer").innerText = "Time out!";
            return;
        }

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((diff / (1000 * 60)) % 60);
        let seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("timer").innerText =
            `${days} d ${hours} h ${minutes} min ${seconds} sec`;
    }, 1500);
});





document.getElementById("monthPicker").addEventListener("change", generateCalendar);

function generateCalendar() {
    let value = document.getElementById("monthPicker").value;
    if (!value) return;

    let [year, month] = value.split("-");
    year = Number(year);
    month = Number(month) - 1;

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let table = "<table><tr>";

    let days = ["Sun", "Mon", "Tue", "W", "T", "F", "S"];
    days.forEach(d => table += `<th>${d}</th>`);
    table += "</tr><tr>";

    for (let i = 0; i < firstDay; i++) {
        table += "<td></td>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
        table += `<td>${day}</td>`;

        if ((day + firstDay) % 7 === 0) {
            table += "</tr><tr>";
        }
    }

    table += "</tr></table>";

    document.getElementById("calendar").innerHTML = table;
}





document.getElementById("calcBirthday").addEventListener("click", () => {
    let input = document.getElementById("birthday").value;
    if (!input) return;

    let now = new Date();
    let birth = new Date(input);


    let next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());

    if (next < now) {
        next.setFullYear(next.getFullYear() + 1);
    }

    let diff = next - now;

    let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("birthdayResult").innerText =
        `Remaining: ${months} mon, ${days % 12} days, ${hours} h, ${minutes} m, ${seconds} s`;
  
});






let products = new Map();    
let orders = new Set();     
let history = new WeakMap();  
let activeProducts = new WeakSet(); 





document.getElementById("add").addEventListener("click", () => {
    let id = prompt("Product ID:");
    let name = prompt("Name:");
    let price = +prompt("Price:");
    let qty = +prompt("Quantity:");

    let product = { id, name, price, qty };

    products.set(id, product);
    history.set(product, ["Created"]);
    activeProducts.add(product);

    alert("Product added!");
});




document.getElementById("delete").addEventListener("click", () => {
    let id = prompt("ID to delete:");

    if (products.has(id)) {
        let product = products.get(id);
        products.delete(id);

        alert("Deleted!");
    } else {
        alert("Not found");
    }
});




document.getElementById("update").addEventListener("click", () => {
    let id = prompt("Product ID:");

    if (!products.has(id)) {
        alert("Not found");
        return;
    }

    let product = products.get(id);

    let price = +prompt("New price:");
    let qty = +prompt("New quantity:");

    product.price = price;
    product.qty = qty;


    let hist = history.get(product);
    hist.push("Updated");
    history.set(product, hist);

    alert("Updated!");
});




document.getElementById("search").addEventListener("click", () => {
    let name = prompt("Product name:");

    let result = [];

    products.forEach(p => {
        if (p.name.toLowerCase().includes(name.toLowerCase())) {
            result.push(p);
        }
    });

    document.getElementById("output").innerText =
        JSON.stringify(result, null, 2);
});




document.getElementById("order").addEventListener("click", () => {
    let id = prompt("Product ID:");
    let qty = +prompt("Quantity:");

    if (!products.has(id)) {
        alert("Product not found");
        return;
    }

    let product = products.get(id);

    if (product.qty < qty) {
        alert("Not enough stock");
        return;
    }

    product.qty -= qty;

    let order = { id, qty, date: new Date() };
    orders.add(order);

    let hist = history.get(product);
    hist.push("Sold " + qty);
    history.set(product, hist);

    alert("Order completed!");
});




document.getElementById("show").addEventListener("click", () => {
    let all = [];

    products.forEach((p, id) => {
        all.push({
            ...p,
            history: history.get(p)
        });
    });

    document.getElementById("output").innerText =
        JSON.stringify(all, null, 2);
});