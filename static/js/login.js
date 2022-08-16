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

//handing login function
function login (data) {
    
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch("https://habit-harbour.herokuapp.com/login", options)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => alert ("Login failed!"))
}

function register (data) {
    console.log("register", data)
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


