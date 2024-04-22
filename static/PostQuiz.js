const quizData2 = [
    {
        question: "What is one advantage of using the producer-consumer model?",
        options: ["Increased resource contention", "Decreased system performance", "Concurrency", "Decreased code modularity"],
        answer: "Concurrency"
    },
    {
        question: "What issue can arise if synchronisation is not properly managed in a producer-consumer system?",
        options: ["Increased throughput", "Deadlock", "Improved system stability", "Reduced resource utilisation"],
        answer: "Deadlock"
    },
    {
        question: "What does the wait operation of a semaphore do in the producer-consumer model?",
        options: ["Increases the semaphore value", "Decreases the semaphore value", "Blocks until a condition is met", "Signals waiting processes to proceed"],
        answer: "Blocks until a condition is met"
    },
    {
        question: "How does the buffer capacity affect the behaviour of a producer-consumer system?",
        options: ["It has no impact on system behaviour", "It determines the maximum number of data items that can be stored", "It decreases resource contention", "It increases system performance"],
        answer: "It determines the maximum number of data items that can be stored"
    },
    {
        question: "What role does mutual exclusion play in the producer-consumer model?",
        options: ["It ensures that only one process can access a resource at a time", "It increases system throughput", "It decreases system stability", "It causes deadlock"],
        answer: "It ensures that only one process can access a resource at a time"
    }
];


const quizContainer2 = document.querySelector(".quiz-container2");
const submitBtn2 = document.getElementById('submit-btn2');
const startQuiz2 = document.getElementById('start-btn2');
const testWarn2 = document.getElementById('test-warn2');
const sideBar2 = document.getElementsByClassName('ndhu-csie-junior-project');
var sideBarContent2 = document.getElementById('sidebar-frame');

submitBtn2.style.display = 'none';

function createQuiz2() {
    quizContainer2.innerHTML = '';

    sideBarContent2.style.height = ''
    quizContainer2.style.display = 'block'
    quizData2.forEach((quiz, index) => {
        const questionDiv2 = document.createElement("div");
        questionDiv2.classList.add("question");
        questionDiv2.textContent = `${index + 1}. ${quiz.question}`;

        const optionsDiv2 = document.createElement("div");
        optionsDiv2.classList.add("options");

        quiz.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement("label");
            optionLabel.classList.add("option");
            const optionText = document.createElement("p");
            optionText.textContent = option;

            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question-${index}`;
            optionInput.value = option;
            optionInput.dataset.correctAnswer = quiz.answer;

            optionsDiv2.appendChild(optionLabel);
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
        });

        quizContainer2.appendChild(questionDiv2);
        quizContainer2.appendChild(optionsDiv2);
    });
}

submitBtn2.addEventListener("click", handleSubmit2);

function handleSubmit2() {
    let score = 0;

    const questions = document.getElementsByClassName("question");
    const totalQuestions = questions.length;

    for (let i = 0; i < totalQuestions; i++) {
        const options = questions[i].nextSibling.querySelectorAll('input[type="radio"]');
        const correctAnswer = quizData2[i].answer;
        let answered = false;

        options.forEach(option => {
            if (option.checked) {
                answered = true;
                if (option.value === correctAnswer) {
                    option.parentElement.classList.add("correct");
                    score++;
                } else {
                    option.parentElement.classList.add("wrong");
                }
            }
            if (option.value === correctAnswer) {
                option.parentElement.classList.add("correct");
            }
        });

        if (!answered) {
            const correctOption = Array.from(options).find(option => option.value === correctAnswer);
            if (correctOption) {
                correctOption.parentElement.classList.add("correct");
            }
        }
    }

    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("quiz-score");
    scoreDiv.innerHTML = `<p>You scored ${score} out of ${totalQuestions}</p>`;
    document.getElementsByClassName("quiz-container")[0].appendChild(scoreDiv);

    submitBtn2.innerHTML = "Go back";
    submitBtn2.removeEventListener("click", handleSubmit2);
    submitBtn2.addEventListener("click", handleGoBack2);

    submitBtn2.innerHTML = "Go back";
}

function handleGoBack2() {

    quizContainer2.innerHTML = '';
    quizContainer2.style.display = 'none';
    startQuiz2.style.display = 'block';
    testWarn2.style.display = 'block';
    sideBar2[0].style.display = 'flex';
    submitBtn2.style.display = 'none';
    submitBtn2.innerHTML = "Submit";
    sideBarContent2.style.height = '100vh'

    submitBtn2.removeEventListener("click", handleGoBack2);
    submitBtn2.addEventListener("click", handleSubmit2);
}

startQuiz2.addEventListener('click', () => {
    startQuiz2.style.display = 'none';
    testWarn2.style.display = 'none';
    sideBar2[0].style.display = 'none';
    createQuiz2();
    submitBtn2.style.display = 'block';
});
