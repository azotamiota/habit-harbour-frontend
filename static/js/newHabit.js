

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