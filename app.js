function setLanguage(languageCode) {
    localStorage.setItem('language', languageCode);

    fetch('language/' + languageCode + '.json')
        .then(response => response.json())
        .then(data => {
            document.title = data.title || 'Pascal\'s Triangle';
            document.getElementById('selected-lang').textContent = data.language || 'Null';
            document.getElementById('selected-lang').style.setProperty('--flag-image', 'url(res/flags/' + languageCode + '.png)' || '#000');
            document.getElementById('navbar-history').textContent = data.navbar_history || 'Null';
            document.getElementById('navbar-modelling').textContent = data.navbar_modelling || 'Null';
            console.log(data.language);
            console.log(data.title);
            console.log(data.navbar_history);
            console.log(data.navbar_modelling);
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
};
