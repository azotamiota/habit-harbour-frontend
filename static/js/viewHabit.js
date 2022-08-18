const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#hbtTitle");
const modalTarget = document.querySelector("#hbtTarget");
const modalFrequency = document.querySelector("#hbtFreq");
const modalStreak = document.querySelector("#hbtStreak");

const buttonForm = document.querySelector('#button-form');
const waterCountdownContainer = document.querySelector('#water-cd-container')
const waterCountdown = document.querySelector('#water-countdown')
const exerciseCountdownContainer = document.querySelector('#exercise-cd-container')
const exerciseCountdown = document.querySelector('#exercise-countdown')

const completedButton = document.createElement('input')
completedButton.setAttribute('type', 'submit');
completedButton.setAttribute('value', 'Target completed!');
completedButton.setAttribute('id', 'completed-button');


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


const loadWaterHabit = () => {
    
    waterCountdownContainer.style.display = 'flex';
    exerciseCountdownContainer.style.display = 'none'

    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;

    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}`)
    // fetch(`http://localhost:3000/dashboard/${user}`)
        .then(res => res.json())
        .then(data => {
                modalTitle.textContent = "Water";
                modalTarget.textContent = `My current target : ${data.user.habits.waterTarget}`;
                modalFrequency.textContent = `Days per week : ${data.user.habits.waterDays}`;
                modalStreak.textContent = `My current streak : ${data.user.habits.waterStreak}`;
                modal.style.display = "block"
        })
        .then(
            () => {
            loadButton(user)
        }
        )
    
};

const loadExerciseHabit = () => {

    waterCountdownContainer.style.display = 'none';
    exerciseCountdownContainer.style.display = 'flex';

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
        .then(() => {
            loadButton(user)
        }
        )
};

const loadButton = (user) => {
    
    fetch(`https://habit-harbour.herokuapp.com/dashboard/${user}/habits`)
    .then(res => res.json())
    .then(data => {
        const currentHabit = document.querySelector('#hbtTitle').textContent.toLowerCase();
        if (currentHabit == 'water') {
            
            if (data.waterCompleted) {
                completedButton.disabled = true;
                completedButton.setAttribute('value', 'Come back tomorrow!');

            } else {
                completedButton.disabled = false;
                completedButton.setAttribute('value', 'Target completed!');
            }

        } else if (currentHabit == 'exercise') {
           
            if (data.exerciseCompleted) {
                completedButton.disabled = true;
                completedButton.setAttribute('value', 'Come back tomorrow!');
            } else {
                completedButton.disabled = false;
                completedButton.setAttribute('value', 'Target completed!');
            }

        }

    })

    buttonForm.appendChild(completedButton)
    
}

const completeTarget = () => {

    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;

    const currentHabit = document.querySelector('#hbtTitle').textContent.toLowerCase();

    console.log('body looks like what I send from here: ',  "username" , user,
            "habit" , currentHabit,
            "completed", 'true')

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
    completedButton.setAttribute('value', 'Come back tomorrow!');
    completedButton.disabled = true;
}


completedButton.addEventListener('click', (e) => {
    e.preventDefault();
    updateChangesAtFrontend();
    completeTarget();
    insertTimeToMidnight();

}) 


function changeTitle() {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;
    document.querySelector("#vHabitsTitle").textContent =`${user}'s habits`
}

changeTitle();




completedButton.addEventListener('click', (e) => {
    e.preventDefault();
    completeTarget();
    updateChangesAtFrontend();
    insertTimeToMidnight();

}) 

const insertTimeToMidnight = () => {
    const currentHabit = document.querySelector('#hbtTitle').textContent.toLowerCase();


    if (currentHabit == 'water') {

        let midnight = new Date();
        midnight.setHours(24);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);
        let millisecondsToMidnight = midnight.getTime() - new Date().getTime();

        // const resetLabel = document.querySelector('#reset-label')
        
        let secondsTo = millisecondsToMidnight / 1000;
        let minutesTo = secondsTo / 60;
        let hoursTo = minutesTo / 60;

        waterCountdownContainer.style.display = 'flex';
        exerciseCountdownContainer.style.display = 'none'
        waterCountdown.innerHTML = `${Math.floor(hoursTo)}h : ${Math.floor(minutesTo % 60)}m : ${Math.floor(secondsTo % 60)}s`;
        setInterval(() => {
            millisecondsToMidnight -= 1000;
            secondsTo = millisecondsToMidnight / 1000;
            minutesTo = secondsTo / 60;
            hoursTo = minutesTo / 60;
            waterCountdown.innerHTML = `${Math.floor(hoursTo)}h : ${Math.floor(minutesTo % 60)}m : ${Math.floor(secondsTo % 60)}s`
        }, 1000)

    } else if (currentHabit == 'exercise') {

        let midnight = new Date();
        midnight.setHours(24);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);
        let millisecondsToMidnight = midnight.getTime() - new Date().getTime();

        // const resetLabel = document.querySelector('#reset-label')
        
        let secondsTo = millisecondsToMidnight / 1000;
        let minutesTo = secondsTo / 60;
        let hoursTo = minutesTo / 60;

        waterCountdownContainer.style.display = 'none';
        exerciseCountdownContainer.style.display = 'flex'
        exerciseCountdown.innerHTML = `${Math.floor(hoursTo)}h : ${Math.floor(minutesTo % 60)}m : ${Math.floor(secondsTo % 60)}s`;
        setInterval(() => {
            millisecondsToMidnight -= 1000;
            secondsTo = millisecondsToMidnight / 1000;
            minutesTo = secondsTo / 60;
            hoursTo = minutesTo / 60;
            exerciseCountdown.innerHTML = `${Math.floor(hoursTo)}h : ${Math.floor(minutesTo % 60)}m : ${Math.floor(secondsTo % 60)}s`
        }, 1000)

    }
}
