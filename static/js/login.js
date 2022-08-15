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

