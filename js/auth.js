const toggleBtn = document.querySelector(".show_password");
  const passwordInput = document.querySelector("#password");
  const icon = toggleBtn.querySelector(".icon_eye");

  toggleBtn.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
  });