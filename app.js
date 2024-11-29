function setLanguage(languageCode) {
    localStorage.setItem('language', languageCode);

    fetch('language/' + languageCode + '.json')
        .then(response => response.json())
        .then(data => {
            document.title = data.title || 'Pascal\'s Triangle';
            document.getElementById('selected-lang').textContent = data.language || 'Null';
            document.getElementById('selected-lang').style.setProperty('--flag-image', 'url(res/flags/' + languageCode + '.png)' || '#000');
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
};
