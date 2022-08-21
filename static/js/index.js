const devMessage = document.querySelector('#dev-msg')
const credMessage = document.querySelector('#cred-msg')

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
            document.querySelector('.loader').style.display = 'none';
            if (data["success"]) {
                localStorage.setItem("token", data["token"]);
                window.location.assign("/home.html");
            } else {
                throw "Unable to authenticate!"
            }
        })
        .catch(err => {
            document.querySelector(".popup").classList.remove("active");
            document.querySelector('.loader').style.display = 'none';
            credMessage.innerHTML = 'Login failed! Please try again.'
                setTimeout(() => {
                    credMessage.innerHTML = ''
                }, 5000)
        })
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
            document.querySelector('.loader-reg').style.display = 'none';
            if (data["username"]) {
                document.querySelector(".popup-reg").classList.remove("active");
                credMessage.innerHTML = 'Registration successful!<br>Now you can log in'
                setTimeout(() => {
                    credMessage.innerHTML = ''
                }, 3000)
            } else {
                throw "Unable to register!"
            }
        })
        .catch(err => {
            document.querySelector(".popup-reg").classList.remove("active");
            document.querySelector('.loader-reg').style.display = 'none';
            credMessage.innerHTML = 'Registration failed! Please try again.'
            console.log(err);
                setTimeout(() => {
                    credMessage.innerHTML = ''
                }, 3000)
        })
}

document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
            
    document.querySelector('.loader').style.display = 'flex';

    const form = new FormData(e.target);

    login({
        username: form.get("username"),
        password: form.get("password")
    })

    e.target.reset();
})

document.querySelector("#registerForm").addEventListener("submit", (e) => {

    e.preventDefault();

    document.querySelector('.loader-reg').style.display = 'flex';

    const form = new FormData(e.target);

    register({
        username: form.get("username2"),
        password: form.get("password2")
    })

    e.target.reset();
})

const evaluateScreenSize = () => {
    if (window.innerWidth > 426) {
        devMessage.style.display = 'block';
    } else {
        devMessage.style.display = 'none';
    }
}

window.addEventListener('resize', (e) => {
    
    evaluateScreenSize();
})

evaluateScreenSize();


module.exports = {
    login: login,
    register: register,
}
