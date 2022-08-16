const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#hbtTitle");
const modalTarget = document.querySelector("#hbtTarget");
const modalFrequency = document.querySelector("#hbtFreq");
const modalStreak = document.querySelector("#hbtStreak");

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

    fetch(`http://localhost:3000/dashboard/${user}`)
        .then(res => res.json())
        .then(data => {
                modalTitle.textContent = "Water";
                modalTarget.textContent = `My current target : ${data.user.habits.waterTarget}`;
                modalFrequency.textContent = `Days per week : ${data.user.habits.waterDays}`;
                modalStreak.textContent = `My current streak: ${data.user.habits.waterStreak}`;
                modal.style.display = "block"
        })
};

const loadExerciseHabit = () => {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;
    fetch(`http://localhost:3000/dashboard/${user}`)
        .then(res => res.json())
        .then(data => {
            modalTitle.textContent = "Exercise";
            modalTarget.textContent = `My current target : ${data.user.habits.exerciseTarget}`;
            modalFrequency.textContent = `Days per week : ${data.user.habits.exerciseDays}`;
            modalStreak.textContent = `My current streak : ${data.user.habits.exerciseStreak}`;
            modal.style.display = "block"
        })
};