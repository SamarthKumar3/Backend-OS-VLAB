(function () {
    'use strict';

    var canvasId = 'canvas';
    var dimX = 10;
    var fpscOptions = {
        consumerDelay: [300, 300],
        producerDelay: [300, 300],
        chunksCount: 4,
        queueCapacity: 4,
        canvasId: canvasId,
        dimX: dimX
    };
    var model = void 0;

    onClick('options-apply', function () {
        var options = optionsPaneRead();
        options.canvasId = canvasId;
        options.dimX = dimX;
        options.consumerDelay = [300, 300],
            options.producerDelay = [300, 300],
            start(options);
    });

    start(fpscOptions);

    // ---=== Utils ===---
    function start(options) {
        if (model && model.isRunning()) {
            model.pause();
        }
        recreateCanvas();
        options.dimY = 7 + (options.queueCapacity || 3);
        model = window.startModel(options);
        optionsPaneUpdate(options);
    }

    function onClick(id, cb) {
        document.getElementById(id).addEventListener('click', cb);
    }

    function recreateCanvas() {
        var container = document.getElementById('canvas-container');
        container.removeChild(document.getElementById(canvasId))

        var canvas = document.createElement('canvas');
        canvas.id = canvasId;
        container.appendChild(canvas);

        onClick(canvasId, function () {
            if (model.isRunning()) {
                model.pause();
            } else if (model.isPaused()) {
                model.start();
            }
        });
    }

    // function recreateCanvas2() {
    //     var container = document.getElementById('canvas-container2');
    //     container.removeChild(document.getElementById(canvasId))

    //     var canvas = document.createElement('canvas');
    //     canvas.id = canvasId;
    //     container.appendChild(canvas);

    //     onClick(canvasId, function () {
    //         if (model.isRunning()) {
    //             model.pause();
    //         } else if (model.isPaused()) {
    //             model.start();
    //         }
    //     });
    // }

    function optionsPaneUpdate(options) {
        document.getElementById('chunks-count').value = options.chunksCount;
        document.getElementById('queue-cap').value = options.queueCapacity;
    }

    function optionsPaneRead() {
        return {
            chunksCount: +document.getElementById('chunks-count').value,
            queueCapacity: +document.getElementById('queue-cap').value
        };
    }

    function rand(a, b) {
        return a + Math.floor(Math.random() * (b - a + 1));
    }
})();

