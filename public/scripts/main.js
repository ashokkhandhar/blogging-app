// adding boxshadow to navbar
window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById("navigation");

    if (currentScroll > 0) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});

// profile dropdown
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

// theme changing
const body = document.body;
body.dataset.theme = JSON.parse(localStorage.getItem("theme")) || "light";

if(body.dataset.theme === "dark") {
    document.querySelector(".light-icon").classList.add("active");
    document.querySelector(".dark-logo").classList.add("active");
} else {
    document.querySelector(".dark-icon").classList.add("active");
    document.querySelector(".light-logo").classList.add("active");
}

function toggleTheme(){
    if(body.getAttribute("data-theme") === "dark"){
        body.setAttribute("data-theme", "light");
        document.querySelector(".light-logo").classList.add("active");
        document.querySelector(".dark-logo").classList.remove("active");
        document.querySelector(".dark-icon").classList.add("active");
        document.querySelector(".light-icon").classList.remove("active");
        localStorage.setItem("theme", JSON.stringify(body.dataset.theme));
    }
    else {
        body.setAttribute("data-theme", "dark");
        document.querySelector(".dark-logo").classList.add("active");
        document.querySelector(".light-logo").classList.remove("active");
        document.querySelector(".light-icon").classList.add("active");
        document.querySelector(".dark-icon").classList.remove("active");
        localStorage.setItem("theme", JSON.stringify(body.dataset.theme));
    }
}