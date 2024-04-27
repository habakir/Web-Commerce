window.addEventListener('load', () => {
    document.getElementById('register').addEventListener('click', (evt) => {
        evt.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        fetch('http://127.0.0.1:9001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = 'login.html';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});