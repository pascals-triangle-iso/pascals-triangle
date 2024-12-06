function setLanguage(languageCode) {
    localStorage.setItem('language', languageCode);

    fetch('language/' + languageCode + '.json')
        .then(response => response.json())
        .then(data => {
            const currentPage = window.location.pathname;

            document.title = data.title || 'Pascal\'s Triangle';

            document.getElementById('selected-lang').textContent = data.language || 'Null';
            document.getElementById('selected-lang').style.setProperty('--flag-image', 'url(res/flags/' + languageCode + '.png)' || '#000');
            document.getElementById('navbar-history').textContent = data.navbar_history || 'Null';
            document.getElementById('navbar-modelling').textContent = data.navbar_modelling || 'Null';
            document.getElementById('navbar-quiz').textContent = data.navbar_quiz || 'Null';

            if(currentPage === '/index.html' || currentPage === '/') {
                document.querySelector('.introduction .text').innerHTML = data.introduction_text || 'Null';
                document.querySelector('.text-container.history .text').innerHTML = data.history_text || 'Null';
                document.querySelector('.text-container.modelling .text').innerHTML = data.modelling_text || 'Null';
                document.querySelector('.text-container.quiz .text').innerHTML = data.quiz_text || 'Null';
            }
            
            if(currentPage === '/history.html') {
                document.querySelector('.history-1').innerHTML = data.history_1 || 'Null';
                document.querySelector('.history-2').innerHTML = data.history_2 || 'Null';
                document.querySelector('.history-3').innerHTML = data.history_3 || 'Null';
                document.querySelector('.history-4').innerHTML = data.history_4 || 'Null';
                document.querySelector('.reference').innerHTML = data.reference_text || 'Null';
            }

            if(currentPage === '/modelling.html') {
                document.querySelector('.guide').innerHTML = data.guide || 'Null';
            }

            if (currentPage === '/quiz.html') {
                document.querySelector('.quiz-title').textContent = data.quiz_title || 'Quiz';
                document.querySelector('#quiz-submit-button').textContent = data.quiz_submit_button || 'Submit Quiz';

                const questions = document.querySelectorAll('.quiz-question');
                questions.forEach((question, index) => {
                    const questionKey = `question-${index + 1}`;
                    question.querySelector('.question-text').textContent = data[questionKey] || `Question ${index + 1}`;
                    
                    const answers = question.querySelectorAll('.quiz-answer');
                    answers.forEach((answer, answerIndex) => {
                        const answerKey = `answer-${index + 1}-${answerIndex + 1}`;
                        answer.innerHTML = data[answerKey] || `Answer ${answerIndex + 1}`;
                    });
                });
            }

            if(currentPage === '/temporary.html') {
                document.querySelector('.coming-soon').innerHTML = data.coming_soon || 'Null';
            }
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
};
