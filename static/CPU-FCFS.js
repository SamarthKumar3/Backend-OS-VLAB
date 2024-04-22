document.getElementById("tableData").style.display = "none";
document.getElementById("instruction").style.display = "none";
document.getElementById("hideInstruction").style.display = "none";

btnDisabled();

let processes = [];
let ganttIndex = -1;
let totalTime = 0;
let intervalId = null;
let ganttStatus = false;

class Processes {
    constructor(
        name,
        arrivalTime,
        burstTime,
        priority = 0,
        completiontime = -1,
        wt = -1,
        tat = -1
    ) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.completiontime = completiontime;
        this.wt = wt;
        this.tat = tat;
    }
}

function btnDisabled() {
    let btnAddGanttChart = document.getElementById("addGanttBtn");
    btnAddGanttChart.disabled = true;
}

function createProcesses_main() {
    processes = [];

    // Add 5 processes with specific values
    const processData = [
        { name: "P1", arrivalTime: 2, burstTime: 6 },
        { name: "P2", arrivalTime: 5, burstTime: 2 },
        { name: "P3", arrivalTime: 1, burstTime: 8 },
        { name: "P4", arrivalTime: 0, burstTime: 2 },
        { name: "P5", arrivalTime: 4, burstTime: 4 },
    ];

    for (let index = 0; index < processData.length; index++) {
        const { name, arrivalTime, burstTime } = processData[index];
        let process = new Processes(name, arrivalTime, burstTime);
        processes.push(process);
    }
    resetCompletionTimeColumn();
    document.getElementById("addGanttBtn").disabled = false;
    document.getElementById("ganttChart").innerHTML = "";
    ganttIndex = -1;
    ganttStatus = false;
    generateTable();
    let btnStart = document.getElementById("btn_Start");
    btnStart.disabled = true;
}

function openInstruction() {
    document.getElementById("instruction").style.display = "";
    document.getElementById("hideInstruction").style.display = "";
    document.getElementById("showInstruction").style.display = "none";
}

function closeInstruction() {
    document.getElementById("instruction").style.display = "none";
    document.getElementById("hideInstruction").style.display = "none";
    document.getElementById("showInstruction").style.display = "";
}

function updateProcess() {
    let pName = document.getElementById("uProcessName").value;
    let arrivalTime = document.getElementById("uArrivalTime").value;
    let burstTime = document.getElementById("uBurstTime").value;

    for (let index = 0; index < processes.length; index++) {
        let process = processes[index];
        if (process.name === pName) {
            process.arrivalTime = arrivalTime;
            process.burstTime = burstTime;
            break;
        }
    }

    generateTable();
}

function addGanttChart() {
    fcfsCompare();
    if (ganttIndex < processes.length - 1) ganttIndex++;
    else {
        ganttStatus = true;
        showResult();
        return;
    }

    const currentProcess = processes[ganttIndex];
    totalTime += currentProcess.burstTime;

    // Display a message indicating the process, burst time, and completion time
    const message = `${currentProcess.name} requires ${currentProcess.burstTime
        } seconds to complete, which means ${totalTime - currentProcess.burstTime
        } + ${currentProcess.burstTime} = ${totalTime} is the completion time.`;
    displayMessage(message);

    let content =
        '<div class="col flex border border-r-black"> ' +
        currentProcess.name +
        '<div class="text-end">' +
        totalTime +
        "</div> </div>";
    let tableContent = document.getElementById("ganttChart").innerHTML;
    tableContent += content;
    document.getElementById("ganttChart").innerHTML = tableContent;

    let rowId = currentProcess.name;
    let tableRow = document.getElementById(rowId);
    if (tableRow) {
        tableRow.style.opacity = "0.3";
    }
}

function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "alert alert-info";
    messageElement.textContent = message;

    const leftSide = document.getElementById("leftSide");
    if (leftSide) {
        leftSide.appendChild(messageElement);

        setTimeout(() => {
            leftSide.removeChild(messageElement);
        }, 3000);
    }
}

function generateTable() {
    let tableContent = "";
    processes.forEach((process, processId) => {
        let row = process.name;
        tableContent += "<tr id=" + row + ">";
        tableContent += "<td>" + process.name + "</td>";
        tableContent += "<td>" + process.arrivalTime + "</td>";
        tableContent += "<td>" + process.burstTime + "</td>";

        process.completiontime != -1
            ? (tableContent +=
                "<td class='blue-text'>" + process.completiontime + "</td>")
            : null;

        process.tat !== -1
            ? (tableContent +=
                "<td>" +
                process.completiontime +
                " - " +
                process.arrivalTime +
                " = " +
                (process.completiontime - process.arrivalTime) +
                "</td>")
            : null;

        process.wt !== -1
            ? (tableContent +=
                "<td>" +
                process.tat +
                " - " +
                process.burstTime +
                " = " +
                (process.tat - process.burstTime) +
                "</td>")
            : null;

        tableContent += "</tr>";
    });

    let tableContentElement = document.getElementById("tableContent");
    if (tableContentElement) {
        tableContentElement.innerHTML = tableContent;
    }

    let tableDataElement = document.getElementById("tableData");
    if (tableDataElement) {
        tableDataElement.style.display = "";
    }
}

function showResult() {
    let columns = document.getElementById("tableHeadRow").innerHTML;
    document.getElementById("tableHeadRow").innerHTML = columns;
    document.getElementById("addGanttBtn").disabled = true;

    generateResultData();

    generateTable();

    if (ganttIndex === processes.length - 1) {
        revealCompletionTimeColumn();
    }
    if (ganttIndex === processes.length - 1) {
        revealCompletionTimeColumn();
        displayFormulas();
    }
}

function revealCompletionTimeColumn() {
    document.getElementById("completionTimeHeader").style.display = "";
    document.getElementById("completionTimeHeader2").style.display = "";
    document.getElementById("completionTimeHeader3").style.display = "";
}

function resetCompletionTimeColumn() {
    document.getElementById("completionTimeHeader").style.display = "none";
    document.getElementById("completionTimeHeader2").style.display = "none";
    document.getElementById("completionTimeHeader3").style.display = "none";
}

function generateResultData() {
    let cTime = 0;
    for (let index = 0; index < processes.length; index++) {
        cTime += processes[index].burstTime;
        processes[index].completiontime = cTime;

        processes[index].tat =
            processes[index].completiontime - processes[index].arrivalTime;

        processes[index].wt = processes[index].tat - processes[index].burstTime;
    }
}

function fcfsCompare() {
    processes.sort(fcfs);
    for (let index = 0; index < processes.length; index++) {
        let process = processes[index];
        process.priority = index;
    }
}

function fcfs(x, y) {
    if (x.arrivalTime < y.arrivalTime) return -1;

    if (x.arrivalTime > y.arrivalTime) return 1;

    return 0;
}

function reset() {
    document.getElementById("ganttChart").innerHTML = "";
    let btnStart = document.getElementById("btn_Start");
    btnStart.disabled = false;
    let btnAddGanttChart = document.getElementById("addGanttBtn");
    btnAddGanttChart.disabled = false;

    totalTime = 0;

    processes.forEach((process) => {
        let rowId = process.name;
        let tableRow = document.getElementById(rowId);
        if (tableRow) {
            tableRow.style.opacity = "1.0";
        }
    });

    document.getElementById("tableData").style.display = "none";
}
