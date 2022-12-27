const form = document.getElementById("logIn");
form.addEventListener('submit', (e) => {
    e.preventDefault();
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
    }).then(function(res) {
        console.log(res)
        if (res.ok) {
            document.location.href="./index.html"; 
            } else {
            let errorText = document.querySelector(".errorMessage");
            errorText.innerHTML = "Utilisateur inconnu !"
            } 
            return res;
    })    
})