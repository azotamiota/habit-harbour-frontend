// Check if user logged in 
if(!localStorage.getItem("token")) {
    window.location.assign('../index.html')
}

const logoutButton = document.querySelector('#logout-btn')

// Function to control navBar
function swapNav() {
    const navBar = document.querySelector(".sidebar");
    const main = document.querySelector("main");
    const buttonsContainer = document.querySelector('#buttons-container')
    if (navBar.style.width === "100%") {
        navBar.style.width = "25px";
        buttonsContainer.style.opacity = '0'

    } else {
        navBar.style.width = "100%";
        buttonsContainer.style.opacity = '1'
    }
}

// Function to control slider 
const slider = document.getElementById("myRange");
let output = document.getElementById("value");

output.textContent = slider.value;
slider.oninput = function () {
    output.textContent = this.value;
}

slider.addEventListener("input", function(){
    let x = ((slider.value - slider.min) / (slider.max - slider.min) * 100 );
    let color = 'linear-gradient(90deg, #E74E35 ' + x + '%, #373A36 ' + x + '%)';
    slider.style.background = color;
})



// Function to handle POST request 
function trackNewHabit (data) {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}/habits`, options)
        .then(window.location.assign("/viewHabit.html"));
}



document.querySelector("#trackHabit").addEventListener("submit", (e) => {
    e.preventDefault();

    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;
    const form = new FormData(e.target);

    trackNewHabit({
        username: user,
        habit: form.get("habit"),
        target: form.get("target"),
        days: form.get("days")
    })

    e.target.reset();
})

logoutButton.addEventListener('click', () => {
    localStorage.clear()
})
