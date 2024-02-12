window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById("navigation");

    if (currentScroll > 0) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});


const body = document.body;
const themeBtn = document.querySelector(".theme-btn");

function toggleTheme(){
    if(body.getAttribute("data-theme") === "dark"){
      themeBtn.innerText = "Dark Theme";
      body.setAttribute("data-theme", "light");
    }
    else {
        themeBtn.innerText = "Light Theme";
        body.setAttribute("data-theme", "dark");
    }
}