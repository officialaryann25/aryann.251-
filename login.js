/* ===========================
   LOGIN.JS – Authentication Logic
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  // Redirect if already logged in
  const stored = localStorage.getItem("icecream_user");
  if (stored) {
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const submitBtn = document.getElementById("login-submit");

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^.{6,}$/;

  function setError(input, errorEl, message) {
    input.classList.add("error");
    errorEl.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;
    errorEl.style.display = "flex";
  }

  function clearError(input, errorEl) {
    input.classList.remove("error");
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setError(emailInput, emailError, "Email is required.");
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setError(emailInput, emailError, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      setError(passwordInput, passwordError, "Password is required.");
      return false;
    }
    if (!PASSWORD_REGEX.test(value)) {
      setError(
        passwordInput,
        passwordError,
        "Password must be at least 6 characters."
      );
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  }

  // Real-time validation on blur
  emailInput?.addEventListener("blur", validateEmail);
  passwordInput?.addEventListener("blur", validatePassword);

  emailInput?.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) validateEmail();
  });

  passwordInput?.addEventListener("input", () => {
    if (passwordInput.classList.contains("error")) validatePassword();
  });

  // Form submission
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailOk = validateEmail();
    const passOk = validatePassword();

    if (!emailOk || !passOk) return;

    // Simulate login
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ri-loader-4-line"></i> Signing in…`;

    setTimeout(() => {
      const user = {
        email: emailInput.value.trim(),
        name: emailInput.value.split("@")[0],
      };
      localStorage.setItem("icecream_user", JSON.stringify(user));

      submitBtn.innerHTML = `<i class="ri-checkbox-circle-line"></i> Success!`;
      submitBtn.style.background =
        "linear-gradient(135deg, #10b981, #059669)";

      setTimeout(() => {
        const redirect = new URLSearchParams(window.location.search).get(
          "redirect"
        );
        window.location.href = redirect || "index.html";
      }, 1000);
    }, 1200);
  });

  // Toggle password visibility
  const togglePassword = document.getElementById("toggle-password");
  togglePassword?.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.innerHTML =
      type === "password"
        ? '<i class="ri-eye-line"></i>'
        : '<i class="ri-eye-off-line"></i>';
  });
});
