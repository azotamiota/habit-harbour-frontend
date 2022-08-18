const tokenData = jwt_decode(localStorage.getItem("token"));
const user = tokenData.username;

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



function updateTitle() {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;
    document.querySelector("#welcomeTitle").textContent = `Hello ${user}, Welcome to Habit harbour`
}
updateTitle()
