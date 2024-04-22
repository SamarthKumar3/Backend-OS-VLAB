const Router = require('express');
const globalRouter = Router();
const path = require('path');

globalRouter.get('/', (req, res) => {
    const experiments = [
        { id: 1, title: 'Components of PC', description: 'Coming soon..', link: 'Components' },
        { id: 2, title: 'CPU-Scheduling-FCFS', description: 'It is basically a set of rules used by OS to manage the order in which processes should get execute on CPU. It’s primary goal is to efficiently and effectively utilize the system resources and increase system performance.', link: 'CPU-Scheduling-FCFS' },
        { id: 3, title: 'FIFO', description: 'In order to manage the memory paging concept is used usually. Page replacement algorithms are crucial in paging because they choose which page to stay in the main memory when a new page is received.', link: 'FIFO' },
        { id: 4, title: 'SJF', description: 'A CPU scheduling algorithm that selects the process with the shortest burst time for execution when multiple process demand execution.', link: 'SJF' },
        { id: 5, title: 'Round-Robin', description: 'Round-robin is a CPU scheduling algorithm where each process is assigned a fixed time slice (or quantum) in a cyclic order. Processes are executed in a circular queue, with each process getting a turn to run for a predefined time before being preempted to allow another process to run.', link: 'Round-Robin' },
        { id: 6, title: 'Disk-Scheduling-FCFS', description: 'FCFS (First-Come, First-Served) is a simple disk scheduling algorithm used in operating systems to control and optimize the access of disk storage. This algorithm works on the principle of serving the requests in the order they arrive in the disk queue.', link: 'Disk-Scheduling-FCFS' },
        { id: 7, title: 'Memory-Management', description: "Memory management is the process of controlling and coordinating computer memory, assigning portions known as blocks or pages to various running programs to optimize overall system performance. It involves managing the computer's memory resources effectively, ensuring that each program gets the memory it needs and that memory is used efficiently.", link: 'Memory-Management' },
        { id: 8, title: "Banker's Algorithm", description: "Banker's Algorithm is a method to ensure that resource allocation does not lead to deadlocks. It simulates resource allocation for maximum possible resource usage and checks if it's safe to proceed. The algorithm prevents deadlocks by ensuring that resources are only allocated when it's safe to do so. It helps determine a safe sequence of resource allocation to avoid deadlocks.", link: "Bankers-Algorithm" },
        { id: 9, title: "Dining Philosopher", description: "A classic synchronization problem that involves multiple processes sharing a limited set of resources in order to perform a common task", link: 'Dining-Philosopher' },
        { id: 10, title: 'Producer-Consumer', description: 'The producer-consumer problem is a classic synchronisation problem that involves two types of concurrent processes: producers, which create data items, and consumers, which consume those items.', link: 'Producer-Consumer' },

    ];
    res.render(path.join(__dirname, '..', 'pages', 'Simulations.ejs'), { experiments });
});

globalRouter.get('/Producer-Consumer', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'Producer-Consumer.ejs'));
})

globalRouter.get('/Round-Robin', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'Round-Robin', 'index.ejs'));
})

globalRouter.get('/FIFO', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'FIFO.ejs'));
})

globalRouter.get('/Disk-Scheduling-FCFS', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'Disk-Scheduling-FCFS.ejs'));
})

globalRouter.get('/CPU-Scheduling-FCFS', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'CPU-Scheduling-FCFS.ejs'));
})

globalRouter.get('/Bankers-Algorithm', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'Bankers-Algorithm.ejs'));
})

globalRouter.get('/Dining-Philosopher', (req, res) => {
    res.render(path.join(__dirname, '..', 'Simulations', 'Dining-Philosopher.ejs'));
})

module.exports = { globalRouter };
