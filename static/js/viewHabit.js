const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#hbtTitle");
const modalTarget = document.querySelector("#hbtTarget");
const modalFrequency = document.querySelector("#hbtFreq");
const modalStreak = document.querySelector("#hbtStreak");

const buttonForm = document.querySelector('#button-form');

const completedButton = document.createElement('input')
completedButton.setAttribute('type', 'submit');
completedButton.setAttribute('value', 'Completed');
completedButton.setAttribute('id', 'completed-button');

function swapNav() {
    const navBar = document.querySelector(".sidebar");
    const main = document.querySelector("main");
    if (navBar.style.width === "250px") {
        navBar.style.width = "25px";
        main.style.marginLeft = "30px";

    } else {
        navBar.style.width = "250px";
        main.style.marginLeft= "250px";
    }
}


const loadWaterHabit = () => {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;

    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}`)
        .then(res => res.json())
        .then(data => {
                modalTitle.textContent = "Water";
                modalTarget.textContent = `My current target : ${data.user.habits.waterTarget}`;
                modalFrequency.textContent = `Days per week : ${data.user.habits.waterDays}`;
                modalStreak.textContent = `My current streak : ${data.user.habits.waterStreak}`;
                modal.style.display = "block"
        })
    
    loadButton(user);
};

const loadExerciseHabit = () => {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;

    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}`)
        .then(res => res.json())
        .then(data => {
            modalTitle.textContent = "Exercise";
            modalTarget.textContent = `My current target : ${data.user.habits.exerciseTarget}`;
            modalFrequency.textContent = `Days per week : ${data.user.habits.exerciseDays}`;
            modalStreak.textContent = `My current streak : ${data.user.habits.exerciseStreak}`;
            modal.style.display = "block"
        })
    loadButton(user);
};

const loadButton = (user) => {
    
    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}/habits`)
    .then(res => res.json())
    .then(data => {
        const currentHabit = document.querySelector('#hbtTitle').textContent.toLowerCase();
        if (currentHabit == 'water') {

            if (data.waterCompleted) {
                completedButton.disabled = true;  
            } else {
                completedButton.disabled = false;  
            }

        } else if (currentHabit == 'exercise') {

            if (data.exerciseCompleted) {
                completedButton.disabled = true;  
            } else {
                completedButton.disabled = false;  
            }

        }

    })

    buttonForm.appendChild(completedButton)
    
}

const completeTarget = () => {

    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;

    const currentHabit = document.querySelector('#hbtTitle').textContent.toLowerCase();
    
    const options = {
        method: 'POST', 
        mode: 'cors', 
        headers: {
            'Content-Type': 'application/json'     // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({
            "username" : user,
            "habit" : currentHabit,
            "completed": true
        }) 
    }
    
    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}/habits/increment-streak`, options)
        
}

const updateChangesAtFrontend = () => {

    const currentStreak = Number(modalStreak.textContent.split(': ')[1])
    modalStreak.textContent = `My current streak : ${currentStreak + 1}`
    completedButton.disabled = true;
}

completedButton.addEventListener('click', (e) => {
    e.preventDefault();
    completeTarget();
    updateChangesAtFrontend();

}) 
