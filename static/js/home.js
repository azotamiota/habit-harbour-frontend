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


// //Function to show login popup
// document.getElementById("closeNav").addEventListener("click",function () {
//     document.querySelector(".sidebar").classList.add("active");
// });

// //Function to close login popup
// document.querySelector(".popup .close-btn").addEventListener("click", function () {
//     document.querySelector(".popup").classList.remove("active");
// })
