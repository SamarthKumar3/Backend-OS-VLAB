function gg() {
    FCFS();
}

function validation(event) {
    let value = event.target.value;
    if (!/^(\d+,?(,\d+,?)*)?$/.test(value)) {
        alert("invalid input entered. Please enter integer positive numbers separated by comma(,) ");
    }
}

async function FCFS() {
    document.getElementById("vv").innerHTML = ""; // Clear previous input seek time

    var seek_count = 0;
    var distance, cur_track;
    var x_values = document.getElementById("array").value.split(",").map(Number);
    var head = document.getElementById("inputhead").value;
    let size = x_values.length;

    // Display initial seek time
    var initial_track = x_values[0];
    distance = Math.abs(initial_track - head);
    seek_count += distance;
    head = initial_track;

    for (var i = 1; i < size; i++) {
        cur_track = x_values[i];

        distance = Math.abs(cur_track - head);
        seek_count += distance;


        head = cur_track;
    }

    document.getElementById("vv").innerHTML += "Total number of " + "seek operations = " + seek_count;

    await CHART();
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function CHART() {
    var arr = document.getElementById("array").value.split(",").map(Number);
    var head = document.getElementById("inputhead").value;
    var xArray = [head];
    var yArray = arr.map((elem, i) => -i);
    yArray.push(-arr.length);

    var annotations = []; // Array to store annotations

    // Populate xArray with array elements
    for (var i = 0; i < arr.length; i++) {
        xArray.push(arr[i]);
    }

    var data = [];

    // Add points
    data.push({
        x: xArray,
        y: yArray,
        mode: "markers",
        name: "Points",
        line: { color: 'rgb(20,120,228)' }
    });

    var layout = {
        yaxis: { range: [-10, 0] },
        xaxis: { range: [0, 200] },
        title: "FCFS GRAPH",
    };

    Plotly.newPlot("myPlot", data, layout).then(async function () {
        for (var i = 0; i < xArray.length - 1; i++) {
            var seekTime = Math.abs(xArray[i + 1] - xArray[i]);
            var lineData = {
                x: [xArray[i], xArray[i + 1]],
                y: [yArray[i], yArray[i + 1]],
                mode: "lines",
                line: { color: 'rgb(111,168,229)' },
                showlegend: false
            };
            annotations.push({
                x: (xArray[i] + xArray[i + 1]) / 2, // Position the annotation in the middle of the movement
                y: (yArray[i] + yArray[i + 1]) / 2, // Position the annotation in the middle of the movement
                text: "ST: " + seekTime, // Display seek time
                showarrow: false,
                font: {
                    color: 'black',
                    size: 12
                }
            });
            Plotly.addTraces("myPlot", lineData);
            await delay(1000);
        }

        // Calculate initial seek time
        var initial_track = arr[0];
        var initial_seek_time = Math.abs(initial_track - head);

        annotations.push({
            x: initial_track, // Initial track position
            y: yArray[0] - 0.5, // Y-coordinate of the first point
            text: "ST: " + initial_seek_time, // Display initial seek time
            showarrow: false,
            font: {
                color: 'black',
                size: 12
            }
        });

        var updatedLayout = {
            ...layout,
            annotations: annotations // Add annotations to layout
        };

        Plotly.relayout("myPlot", updatedLayout);
    });
}


