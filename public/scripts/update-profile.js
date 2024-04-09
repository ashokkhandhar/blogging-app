const updateProfileBtn = document.getElementById("update-profile-btn");
const newFullname = document.getElementById("newName");
const newUsername = document.getElementById("newUsername");
const newNameError = document.getElementById("newName-error");
const newUsernameError = document.getElementById("newUsername-error");
const newPassword = document.getElementById("new-password");
const newPasswordError = document.getElementById("newPassword-error");

updateProfileBtn.addEventListener("click", (event) =>{
    const newNameValue = newFullname.value;
    const newUsernameValue = newUsername.value;
    const newPasswordValue = newPassword.value;
    if(newNameValue.trim()) {
        newNameError.classList.add("d-none");
        newFullname.classList.remove("user-input");
    } else {
        event.preventDefault();
        newNameError.classList.remove("d-none");
        newFullname.classList.add("user-input");
    }
    if(usernameRegex.test(newUsernameValue)) {
        newUsernameError.classList.add("d-none");
        newUsername.classList.remove("user-input");
    } else {
        event.preventDefault();
        newUsernameError.classList.remove("d-none");
        newUsername.classList.add("user-input");
    }
    if(passwordRegex.test(newPasswordValue)) {
        newPasswordError.classList.add("d-none");
        newPassword.classList.remove("user-input");
    } else {
        event.preventDefault();
        newPasswordError.classList.remove("d-none");
        newPassword.classList.add("user-input");
    }
});