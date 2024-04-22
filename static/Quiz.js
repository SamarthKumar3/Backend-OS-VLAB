/* const quizData = [
    {
        question: "What problem does the producer-consumer model aim to address?",
        options: ["Deadlock", "Synchronization", "Sorting", "Encryption"],
        answer: "Synchronization"
    },
    {
        question: "Which synchronization primitive is commonly used to solve the producer-consumer problem?",
        options: ["Binary search", "Heap", "Semaphore", "Graph"],
        answer: "Semaphore"
    },
    {
        question: "What role does the producer play in the producer-consumer model?",
        options: ["Consuming data items", "Generating data items", "Sorting data items", "Encrypting data items"],
        answer: "Generating data items"
    },
    {
        question: "In the context of the producer-consumer model, what does the term 'buffer' refer to?",
        options: ["A temporary storage space for data items", "A sorting algorithm", "A synchronisation primitive", "A cryptographic algorithm"],
        answer: "A temporary storage space for data items"
    },
    {
        question: "What is the purpose of using semaphores in the producer-consumer model?",
        options: ["To encrypt data items", "To synchronise access to shared resources", "To sort data items", "To compress data items"],
        answer: "To synchronise access to shared resources"
    }
];

const quizContainer = document.querySelector(".quiz-container");
const submitBtn = document.getElementById("submit-btn");
const startQuiz = document.getElementById('start-btn');
const testWarn = document.getElementById('test-warn');
const sideBar = document.getElementsByClassName('ndhu-csie-junior-project');
var sideBarContent = document.getElementById('sidebar-frame');


submitBtn.style.display = 'none';

function createQuiz() {
    quizContainer.innerHTML = '';

    sideBarContent.style.height= ''
    quizContainer.style.display = 'block'
    quizData.forEach((quiz, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.textContent = `${index + 1}. ${quiz.question}`;

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

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

            optionsDiv.appendChild(optionLabel);
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
        });

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(optionsDiv);
    });
}

submitBtn.addEventListener("click", handleSubmit);

function handleSubmit() {
    let score = 0;

    const questions = document.getElementsByClassName("question");
    const totalQuestions = questions.length;

    for (let i = 0; i < totalQuestions; i++) {
        const options = questions[i].nextSibling.querySelectorAll('input[type="radio"]');
        const correctAnswer = quizData[i].answer;
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

    submitBtn.innerHTML = "Go back";
    submitBtn.removeEventListener("click", handleSubmit);
    submitBtn.addEventListener("click", handleGoBack);

    submitBtn.innerHTML = "Go back";
}

function handleGoBack() {

    quizContainer.innerHTML = '';
    quizContainer.style.display = 'none';
    startQuiz.style.display = 'block';
    testWarn.style.display = 'block';
    sideBar[0].style.display = 'flex';
    submitBtn.style.display = 'none';
    submitBtn.innerHTML = "Submit";
    sideBarContent.style.height = '100vh'

    submitBtn.removeEventListener("click", handleGoBack);
    submitBtn.addEventListener("click", handleSubmit);
}

startQuiz.addEventListener('click', () => {
    startQuiz.style.display = 'none';
    testWarn.style.display = 'none';
    sideBar[0].style.display = 'none';
    createQuiz();
    submitBtn.style.display = 'block';
});
 */

// This function is generic and can be used for any quiz data and container.


var sideBarContent = document.getElementById('sidebar-frame');
const sideBar = document.getElementsByClassName('ndhu-csie-junior-project');

function setupQuiz(quizData, quizContainer, startBtn, submitBtn, testWarn) {
    submitBtn.style.display = 'none';
    function createQuiz() {
        quizContainer.innerHTML = '';

        sideBarContent.style.height = ''

        quizContainer.style.display = 'block'

        quizData.forEach((quiz, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.textContent = `${index + 1}. ${quiz.question}`;

            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add("options");

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

                optionsDiv.appendChild(optionLabel);
                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(optionText);
            });

            quizContainer.appendChild(questionDiv);
            quizContainer.appendChild(optionsDiv);
        });
    }

    submitBtn.addEventListener("click", handleSubmit);

    function handleSubmit() {
        let score = 0;

        const questions = document.getElementsByClassName("question");
        const totalQuestions = questions.length;

        for (let i = 0; i < totalQuestions; i++) {
            const options = questions[i].nextSibling.querySelectorAll('input[type="radio"]');
            const correctAnswer = quizData[i].answer;
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

        submitBtn.innerHTML = "Go back";
        submitBtn.removeEventListener("click", handleSubmit);
        submitBtn.addEventListener("click", handleGoBack);

        submitBtn.innerHTML = "Go back";
    }

    function handleGoBack() {

        quizContainer.innerHTML = '';
        quizContainer.style.display = 'none';
        submitBtn.style.display = 'block';
        testWarn.style.display = 'block';
        sideBar[0].style.display = 'flex';
        submitBtn.style.display = 'none';
        submitBtn.innerHTML = "Submit";
        sideBarContent.style.height = '100vh'

        submitBtn.removeEventListener("click", handleGoBack);
        submitBtn.addEventListener("click", handleSubmit);
    }

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        testWarn.style.display = 'none';
        sideBar[0].style.display = 'none';
        createQuiz();
        submitBtn.style.display = 'block';
    });

}


