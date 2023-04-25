const signinForm = document.querySelector("#signinForm");
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
signinForm.addEventListener("log in", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const emailVal = email.value;
  const pwdVal = pwd.value;

  validate(email, emailVal, "Неверный email");
  validate(pwd, pwdVal, "Пароль не может быть пустым");
  validate(pwd, (pwdVal.length > 5), "Пароль не может быть меньше 6 символов")

  const oldUsers = JSON.parse(localStorage.getItem("users"));
  
  if (emailVal && pwdVal.length > 5) {
    location.assign("/index.html");
    if (oldUsers) {
      localStorage.setItem("users", JSON.stringify([...oldUsers, {
        login: emailVal,
        password: pwdVal
      }]))
    } else {
      localStorage.setItem("users", JSON.stringify([{
        login: emailVal,
        password: pwdVal
      }]))
    }
  }
}

function validate(el, condition, errMsg) {
  const container = el.closest("div");
  const errorEl = document.createElement("div");
  errorEl.classList.add("invalid-feedback");
  errorEl.textContent = errMsg;
  const errorExists = container.querySelector(".invalid-feedback")
  if (!condition) {
    if (errorExists) {
      return;
    }
    container.appendChild(errorEl);
    signinForm.classList.add("needs-validation");
    el.classList.add("is-invalid")
    return;
  } else {
    errorExists?.remove();
    signinForm.classList.add("needs-validation");
    el.classList.remove("is-invalid")
    el.classList.add("is-valid")
  }
}