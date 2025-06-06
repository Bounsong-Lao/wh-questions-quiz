document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Quiz Logic
    const questions = [
        {
            question: "You want to ask about someone's name. Which WH-word do you use?",
            options: [
                "Where",
                "What",
                "When",
                "Why"
            ],
            answer: "What",
            explanation: "'What' is used to ask for information about things or ideas."
        },
        {
            question: "To ask about the location of something, you use ______.",
            options: [
                "Who",
                "When",
                "Where",
                "Which"
            ],
            answer: "Where",
            explanation: "'Where' is used to ask about a place or position."
        },
        {
            question: "You want to know the reason for something. You ask ______.",
            options: [
                "How",
                "What",
                "Why",
                "Who"
            ],
            answer: "Why",
            explanation: "'Why' is used to ask for a reason."
        },
        {
            question: "To ask about a person (the subject of a sentence), you use ______.",
            options: [
                "Whom",
                "What",
                "Who",
                "Which"
            ],
            answer: "Who",
            explanation: "'Who' is used to ask about a person, specifically the subject of the verb."
        },
        {
            question: "If you have a limited choice between items (e.g., colors), you ask ______.",
            options: [
                "What",
                "Which",
                "How",
                "Whose"
            ],
            answer: "Which",
            explanation: "'Which' is used when there is a choice from a limited number of items."
        },
        {
            question: "You want to know the time of an event. You ask ______.",
            options: [
                "Where",
                "When",
                "Why",
                "What"
            ],
            answer: "When",
            explanation: "'When' is used to ask about time."
        },
        {
            question: "To ask about the ownership of something, you use ______.",
            options: [
                "Who",
                "Whom",
                "Whose",
                "Which"
            ],
            answer: "Whose",
            explanation: "'Whose' is used to ask about possession or ownership."
        },
        {
            question: "Which word is used to ask about the manner or way something is done?",
            options: [
                "What",
                "Why",
                "How",
                "When"
            ],
            answer: "How",
            explanation: "'How' is used to ask about the way or manner in which something is done."
        },
        {
            question: "If you want to know the quantity of an uncountable noun (like water), you ask ______.",
            options: [
                "How many",
                "How much",
                "How long",
                "How often"
            ],
            answer: "How much",
            explanation: "'How much' is used with uncountable nouns."
        },
        {
            question: "To ask about the number of countable items (like books), you use ______.",
            options: [
                "How much",
                "How many",
                "How far",
                "How well"
            ],
            answer: "How many",
            explanation: "'How many' is used with countable nouns."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizResults.style.display = 'none';
        quizContainer.style.display = 'block';
        totalQuestionsSpan.textContent = questions.length; // Set total questions display
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <ul class="quiz-options">
                        ${q.options.map(option => `<button>${option}</button>`).join('')}
                    </ul>
                    <div class="feedback"></div>
                    <button id="next-question-btn" style="display:none;">ຄຳຖາມຕໍ່ໄປ</button>
                </div>
            `;
            const optionButtons = quizContainer.querySelectorAll('.quiz-options button');
            optionButtons.forEach(button => {
                button.addEventListener('click', selectAnswer);
            });
        } else {
            showResults();
        }
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const userAnswer = selectedButton.textContent;
        const currentQuestion = questions[currentQuestionIndex];
        const feedbackDiv = quizContainer.querySelector('.feedback');
        const nextBtn = document.getElementById('next-question-btn');
        const optionButtons = quizContainer.querySelectorAll('.quiz-options button');

        // Disable all option buttons after an answer is selected
        optionButtons.forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct'); // Highlight correct answer
            } else {
                button.classList.add('wrong'); // Highlight wrong answers
            }
        });

        if (userAnswer === currentQuestion.answer) {
            score++;
            feedbackDiv.textContent = "ຖືກຕ້ອງ! 👍";
            feedbackDiv.classList.remove('wrong');
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `ຜິດ! ຄຳຕອບທີ່ຖືກຕ້ອງແມ່ນ: "${currentQuestion.answer}". ${currentQuestion.explanation}`;
            feedbackDiv.classList.remove('correct');
            feedbackDiv.classList.add('wrong');
        }
        nextBtn.style.display = 'block'; // Show next question button
        nextBtn.addEventListener('click', nextQuestion);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function showResults() {
        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';
        scoreSpan.textContent = score;
    }

    // Initial load: show start button
    quizContainer.innerHTML = `
        <p>ກົດປຸ່ມ "ເລີ່ມທົດສອບ" ເພື່ອເລີ່ມຕົ້ນ!</p>
        <button id="start-quiz-btn">ເລີ່ມທົດສອບ</button>
    `;
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
});
