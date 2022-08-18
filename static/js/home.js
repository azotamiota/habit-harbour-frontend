const tokenData = jwt_decode(localStorage.getItem("token"));
const user = tokenData.username;

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


function updateTitle() {
    const tokenData = jwt_decode(localStorage.getItem("token"));
    const user = tokenData.username;
    document.querySelector("#welcomeTitle").textContent = `Hello ${user}, Welcome to Habit harbour`
}
updateTitle()