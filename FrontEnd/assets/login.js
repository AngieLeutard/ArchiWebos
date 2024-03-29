const form = document.getElementById("logIn")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value

    const data = {
        email: email, 
        password: password
    }

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else if (res.status === 404) {
            let errorText = document.querySelector(".errorMessage")
            errorText.innerHTML = "Utilisateur inconnu !"
        } else if (res.status === 401) {
            let errorText = document.querySelector(".errorMessage")
            errorText.innerHTML = "Non autorisé !"
        }
    }).then(res => {
        if (res.email) {
            localStorage.setItem("email", res.email)
            document.location.href="./index.html"
        }
    })    
})