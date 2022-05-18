const lvlContainer = document.getElementById('lvl-container');

// Generate new option for dropdown
function newOption(val) {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;

    return opt;
}

// Create new dropdown for castle level
function castleLvl() {
    const selectLabel = document.createElement('p');
    const newSelect = document.createElement('select');

    selectLabel.textContent = 'Enter castle lvl:'
    newSelect.setAttribute('name', 'castle-lvl');
    newSelect.setAttribute('id', 'castle-lvl');
    for(let i = 1; i < 26; i++) {
        newSelect.appendChild(newOption(i));
    }
    lvlContainer.appendChild(selectLabel);
    lvlContainer.appendChild(newSelect);
    newSelect.addEventListener('change', highlightRows);
}

castleLvl();

const castleLevel = document.getElementById('castle-lvl');
const newP = document.createElement('p');

castleLevel.addEventListener('change', calculateHelps);

// Calculate # of helps based on castle lvl
function calculateHelps() {
    let numHelps = 0;
    if(castleLevel.value <= 25 && castleLevel.value >= 1 && castleLevel.value !== "") {
        numHelps = Number(castleLevel.value) + 5;
    }
    newP.textContent = numHelps;
    lvlContainer.appendChild(newP);
    return numHelps;
}

calculateHelps();

// Create table
function createHelpsTable() {
    const newTable = document.createElement('table');

    newTable.appendChild(createTh());
    for(let i = 1; i < 31; i++) {
        newTable.appendChild(createRow(i));
    }
    document.body.appendChild(newTable);
}

// Generate row
function createRow(row, helps) {
    const newTr = document.createElement('tr');
    const newTh = document.createElement('th');
    const days = document.createElement('td');
    const hours = document.createElement('td');
    const minutes = document.createElement('td');
    const seconds = document.createElement('td');
    const days0 = document.createElement('td');
    const minutes0 = document.createElement('td');
    const seconds0 = document.createElement('td');
    const hours0 = document.createElement('td');
    newTh.textContent = row;
    days.textContent = 'days';
    hours.textContent = 'hours';
    minutes.textContent = 'minutes';
    seconds.textContent = 'seconds';   
    days0.classList.add(`days-${row}`)
    minutes0.classList.add(`minutes-${row}`)
    hours0.classList.add(`hours-${row}`)
    seconds0.classList.add(`seconds-${row}`)

    days0.textContent = 0;
    minutes0.textContent = 0;
    seconds0.textContent = 0;
    hours0.textContent = 0;

    newTr.appendChild(newTh);
    newTr.appendChild(days0);
    newTr.appendChild(days);
    newTr.appendChild(hours0);
    newTr.appendChild(hours);
    newTr.appendChild(minutes0);
    newTr.appendChild(minutes);
    newTr.appendChild(seconds0);
    newTr.appendChild(seconds);

    if(Number(newTr.children[0].textContent) === 6) {
        newTr.classList.add('highlight');
    }
    return newTr;
}

// Generate th element
function createTh() {
    const tableTitle = document.createElement('th');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const th4 = document.createElement('th');
    const th5 = document.createElement('th');
    const th6 = document.createElement('th');
    const th7 = document.createElement('th');
    const th8 = document.createElement('th');
    const newTr = document.createElement('tr');

    tableTitle.textContent = '# Helps';
    th1.innerHTML = `
        <input type="number" id="days-input">
    `

    th2.textContent = 'days';

    th3.innerHTML = `
        <input type="number" id="hours-input">
    `

    th4.textContent = 'hours';
    
    th5.innerHTML = `
        <input type="number" id="minutes-input">
    `

    th6.textContent = 'minutes';

    th7.innerHTML = `
        <input type="number" id="seconds-input">
    `

    th8.textContent = 'seconds';

    newTr.appendChild(tableTitle);
    newTr.appendChild(th1);
    newTr.appendChild(th2);
    newTr.appendChild(th3);
    newTr.appendChild(th4);
    newTr.appendChild(th5);
    newTr.appendChild(th6);
    newTr.appendChild(th7);
    newTr.appendChild(th8);

    return newTr;
}

createHelpsTable();

const daysInput = document.getElementById('days-input');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');

daysInput.addEventListener('change', numbers);
hoursInput.addEventListener('change', numbers);

minutesInput.addEventListener('change', numbers);
secondsInput.addEventListener('change', numbers);

// Calculate base number
function calculateBase(seconds, minutes, hours, days) {
    
    // =L1+(J1*60)+(H1*60*60)+(F1*60*60*24)

    // L1: seconds
    // J1: minutes
    // H1: hours
    // F1: days
    seconds = Number(secondsInput.value);
    minutes = Number(minutesInput.value);
    hours = Number(hoursInput.value);
    days = Number(daysInput.value);

    const l1 = seconds;
    const j1 = minutes;
    const h1 = hours;
    const f1 = days;

    console.log(l1 + ' seconds');
    console.log(j1 + ' minutes');
    const baseNumber = (l1 + (j1 * 60) + (h1 * 60 * 60) + (f1 * 60 * 60 * 24));
    return baseNumber;
}

// Calculate additional numbers
function calculateNumbers(num) {
    // =IFS((O1-60)<0,0,(O1-(O1*0.99))>60,O1*0.99,(O1-(O1*0.99))<=60,O1-60,O$1=0,0)

    const baseNumber = num;
    let number = 0;
    if((baseNumber - 60) < 0) {
        number = 0;
    } else if ((baseNumber - (baseNumber * 0.99)) > 60) {
        number = baseNumber * 0.99;
    } else if ((baseNumber - (baseNumber * 0.99)) <= 60) {
        number = baseNumber - 60;
    } else if (baseNumber === 0) {
        number = 0;
    }

    return (number);
}

// Highlight row if matches # helps 
function highlightRows() {
    const helps = Number(document.querySelector('select').value) + 5;
    
    const rows = document.querySelectorAll('tr');

    rows.forEach(row => {
        console.log(row.children[0].textContent)

        if(Number(row.children[0].textContent) === helps) {
            row.classList.add('highlight');
        } else {
            row.classList.remove('highlight');
        }
    })
}

let numList = {};
function numbers() {
    numList[0] = calculateBase();
    for(let i = 1; i < 31; i++) {
        numList[i] = Math.round(calculateNumbers(numList[i - 1]));
    }

    numbersCalc();
}

function numbersCalc() {
    const tds = document.querySelectorAll('td');
    tds.forEach(td => {
        let daysBox = 0;
        let hoursBox = 0;
        let minutesBox = 0;
        let secondsBox = 0;
        for(let i = 0; i < 31; i++) {
            if(td.classList.contains(`days-${i}`)) {
                // INT(O2/(60*60*24))
                daysBox = parseInt(numList[i] / (60 * 60 * 24))
                td.textContent = daysBox;
            } else if (td.classList.contains(`hours-${i}`)) {
                // INT(O2-(F2*60*60*24))/(60*60)
                hoursBox = parseInt(numList[i] - (daysBox * 60 * 60 * 24)) / (60 * 60);
                td.textContent = parseInt(hoursBox);
            } else if (td.classList.contains(`minutes-${i}`)) {
                // INT((O2-(F2*60*60*24)-(H2*60*60))/60)
                minutesBox = ((
                    numList[i] - 
                    
                        (daysBox * 60 * 60 * 24) - (hoursBox * 60 * 60)) / 
                        60
                    
                );
                td.textContent = parseInt(minutesBox);
            } else if (td.classList.contains(`seconds-${i}`)) {
                // O2-((F2*60*60*24)+(H2*60*60)+(J2*60))

                secondsBox = (
                    numList[i]-
                    (
                        ((daysBox * 60 * 60 * 24) + 
                        (hoursBox * 60 * 60) + 
                        (minutesBox * 60))  
                    ) 
                );
                td.textContent = parseInt(secondsBox);
            }
        }
    })
}
