//Function to show login popup
document.getElementById("show-login").addEventListener("click",function () {
    document.querySelector(".popup").classList.add("active");
});

//Function to close login popup
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
})

//Function to show registerpopup
document.getElementById("show-register").addEventListener("click",function () {
    document.querySelector(".popup-reg").classList.add("active");
});

//Function to close login popup
document.querySelector(".popup-reg .close-btn").addEventListener("click", function () {
    document.querySelector(".popup-reg").classList.remove("active");
})

//handling login function
function login (data) {
    
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'alg': '2B',
            'typ': 'JWT'
        },
        body: JSON.stringify(data)
    }

    fetch("https://habit-harbour.herokuapp.com/login", options)
    // fetch("http://localhost:3000/login", options)
        .then(res => res.json())
        .then(data => {
            if (data["success"]) {
                localStorage.setItem("token", data["token"]);
                window.location.assign("/home.html");
            } else {
                throw "Unable to authenticate!"
            }
        })
        .catch(err => alert ("Login failed!"))
}


//handling register function
function register (data) {
    
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    fetch("https://habit-harbour.herokuapp.com/register", options)
    // fetch("http://localhost:3000/register", options)
        .then(res => res.json())
        .then(data => {
            if (data["username"]) {
                alert("Registration successful, please login")
                window.location.assign("/index.html");
            } else {
                alert("Registration unsuccessful, please try again later")
                throw "Unable to register!"
            }
        });
}

document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    login({
        username: form.get("username"),
        password: form.get("password")
    })

    e.target.reset();
})

document.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    register({
        username: form.get("username2"),
        password: form.get("password2")
    })

    e.target.reset();
})


module.exports = {
    login: login,
    register: register
}