const submitBtn = document.getElementById("register-submit");
const fullname = document.getElementById("name");
const username = document.getElementById("username");
const password = document.getElementById("password");
const nameError = document.getElementById("name-error");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const usernameRegex = /^[A-Za-z0-9_]{3,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

submitBtn.addEventListener("click", (event) => {
    const nameValue = fullname.value;
    const usernameValue = username.value;
    const passwordValue = password.value;
    if(nameValue.trim()) {
        nameError.classList.add("d-none");
        fullname.classList.remove("user-input");
    } else {
        event.preventDefault();
        nameError.classList.remove("d-none");
        fullname.classList.add("user-input");
    }
    if(usernameRegex.test(usernameValue)) {
        usernameError.classList.add("d-none");
        username.classList.remove("user-input");
    } else {
        event.preventDefault();
        usernameError.classList.remove("d-none");
        username.classList.add("user-input");
    }
    if(passwordRegex.test(passwordValue)) {
        passwordError.classList.add("d-none");
        password.classList.remove("user-input");
    } else {
        event.preventDefault();
        passwordError.classList.remove("d-none");
        password.classList.add("user-input");
    }
});