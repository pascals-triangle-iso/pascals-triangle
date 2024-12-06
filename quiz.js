function submitQuiz() {
    const answers = {
        "q1": "Al-Karaji",
        "q2": "13th century",
        "q3": "Traité du triangle arithmétique",
        "q4": "Yang Hui's Triangle",
        "q5": "Petrus Apianus",
        "q6": "16",
        "q7": "2nd diagonal",
        "q8": "Binomial coefficients",
        "q9": "5",
        "q10": "They add up to the number below them"
    };
    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (const [question, correctAnswer] of Object.entries(answers)) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === correctAnswer) {
            score++;
        }
    }

    const submitButton = document.getElementById('quiz-submit-button');
    submitButton.remove();

    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = `<p style="font-size: 128px; color: turquoise";>${score} / ${totalQuestions} <a href="/quiz.html" style="text-decoration: none; font-size: 128px">⟳</a></p>`;
}