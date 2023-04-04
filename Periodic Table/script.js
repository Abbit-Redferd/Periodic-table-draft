const apiUrl = "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json";

async function fetchElements() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.elements;
}

function displayPeriodicTable(elements) {
    const periodicTableDiv = document.getElementById("periodic-table");
    elements.forEach(element => {
        const elementDiv = document.createElement("div");
        elementDiv.className = "element";
        elementDiv.textContent = element.symbol;
        elementDiv.dataset.element = JSON.stringify(element);
        elementDiv.addEventListener("click", showElementInfo);
        periodicTableDiv.appendChild(elementDiv);
    });
}

function showElementInfo(event) {
    const elementData = JSON.parse(event.currentTarget.dataset.element);
    const elementInfo = document.getElementById("element-info");
    const elementName = document.getElementById("element-name");
    const elementDetails = document.getElementById("element-details");

    elementName.textContent = `${elementData.name} (${elementData.symbol})`;
    elementDetails.innerHTML = `
        Atomic number: ${elementData.number}<br>
        Atomic mass: ${elementData.atomic_mass}<br>
        Category: ${elementData.category}<br>
        Electronegativity: ${elementData.electronegativity_pauling}<br>
    `;
    elementInfo.classList.remove("hidden");
}

function closeElementInfo() {
    const elementInfo = document.getElementById("element-info");
    elementInfo.classList.add("hidden");
}

async function init() {
    const elements = await fetchElements();
    displayPeriodicTable(elements);
}

init();
