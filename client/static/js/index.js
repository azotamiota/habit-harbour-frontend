function swapNav() {
    const navBar = document.querySelector(".sidebar");
    if (navBar.style.width === "250px") {
        navBar.style.width = "25px";
    } else {
        navBar.style.width = "250px";
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