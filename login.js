document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    // Demo: accept any non-empty username with password '123'
    if (username && password === '123') {
        localStorage.setItem('currentUser', username);
        window.location.href = 'home.html';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});