let semaphores = [1, 1, 1, 1, 1]; // 1 represents free spoon, 0 represents taken spoon
let philosopherStatus = ["Thinking", "Thinking", "Thinking", "Thinking", "Thinking"];
let stopFlag = false;
let intervalId;

function startSimulation() {
    stopFlag = false;
    intervalId = setInterval(() => {
        if (stopFlag) {
            clearInterval(intervalId);
            return;
        }
        for (let i = 0; i < 5; i++) {
            if (stopFlag) break;
            setTimeout(() => {
                testAndTakeForks(i);
            }, Math.random() * 1000);
        }
    }, 3000); // Adjust the interval as needed
}

function stopSimulation() {
    stopFlag = true;
}

function test(i) {
    if (semaphores[i] === 1 && semaphores[(i + 1) % 5] === 1) {
        return true;
    } else {
        return false;
    }
}

function testAndTakeForks(i) {
    if (test(i)) {
        takeForks(i); // Call takeForks function if test passes
    }
}

function takeForks(i) {
    if (stopFlag) return;
    philosopherStatus[i] = "Hungry";
    visualize();

    if (test(i)) {
        semaphores[i] = 0; // Take left spoon
        semaphores[(i + 1) % 5] = 0; // Take right spoon
        philosopherStatus[i] = "Eating";
        visualize();
        setTimeout(() => {
            releaseForks(i);
        }, 6000);
    }
}

function releaseForks(i) {
    if (stopFlag) return;
    semaphores[i] = 1; // Release left spoon
    semaphores[(i + 1) % 5] = 1; // Release right spoon
    philosopherStatus[i] = "Thinking";
    visualize();
}


function visualize() {
    document.getElementById('tableBody').innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let philosopherDiv = document.getElementById(`philosopher${i + 1}`);
        let spoonDiv = document.getElementById(`spoon${i + 1}`);
        philosopherDiv.className = `philosopher ${philosopherStatus[i].toLowerCase()}`; // Update class name based on status
        spoonDiv.className = `spoon ${semaphores[i] === 1 ? 'nouse' : 'use'}`; // Update spoon class based on status
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `
      <td>Philosopher ${i + 1}</td>
      <td class="${philosopherStatus[i] === 'Thinking' ? 'red' : philosopherStatus[i] === 'Hungry' ? 'blue' : 'green'}">${philosopherStatus[i]}</td>
      <td>Spoon ${i + 1}</td>
      <td>${semaphores[i]}</td>
    `;
        document.getElementById('tableBody').appendChild(tableRow);
    }
}