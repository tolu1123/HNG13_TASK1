const form = document.querySelector("form");

const fullnameInput = document.querySelector('[name="fullname"]');
const emailInput = document.querySelector('[name="email"]');
const subjectInput = document.querySelector('[name="subject"]');
const messageInput = document.querySelector('[name="message"]');

const fullnameError = document.querySelector("#fullname-error");
const emailError = document.querySelector("#email-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const toastViewport = document.querySelector(".toast-viewport");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // We call validateForm to validate the form elements
  // Returns true if all form elements are valid
  // False otherwise
  const formValid = validateForm(fullname, email, subject, message);

  // If form is valid, show the success toast
  const formMsg = document.querySelectorAll("input + p, textarea + p");

  if (formValid) {
    const toast = createToastNode();
    toastViewport.prepend(toast);

    form.reset();
    formMsg.forEach(ele => {
      ele.className = "form-warning"
    })
  }
  // Form was invalid
  else {
    formMsg.forEach(ele => {
      ele.className = "form-error"
    })
  }
});

function validateForm(fullname, email, subject, message) {
  if (fullname.trim().length < 2) {
    fullnameInput.setAttribute("aria-invalid", "true");
    fullnameError.textContent =
      "Fullname field must have at least 2 characters.";
  }

  if (!emailPattern.test(email.trim())) {
    emailInput.setAttribute("aria-invalid", "true");
    emailError.textContent = "Email Address is invalid";
  }

  if (subject.trim().length < 2) {
    subjectInput.setAttribute("aria-invalid", "true");
    subjectError.textContent = "Subject field must have at least 2 characters.";
  }

  if (message.trim().length < 10) {
    messageInput.setAttribute("aria-invalid", "true");
    messageError.textContent =
      "Message field must have at least 10 characters.";
  }

  if (
    fullname.trim().length < 2 ||
    !emailPattern.test(email.trim()) ||
    subject.trim().length < 2 ||
    message.trim().length < 10
  ) {
    return false;
  }

  return true;
}

// We monitor the form as the inputs are filled
fullnameInput.addEventListener("input", (e) => {
  e.preventDefault();

  const fullname = fullnameInput.value.trim();

  if (fullname.length < 2) {
    fullnameInput.setAttribute("aria-invalid", "true");
    fullnameError.textContent =
      "Fullname field must have at least 2 characters.";
  } else {
    removeError(fullnameInput, fullnameError);
  }
});

emailInput.addEventListener("input", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!emailPattern.test(email.trim())) {
    emailInput.setAttribute("aria-invalid", "true");
    emailError.textContent = "Email Address is invalid";
  } else {
    removeError(emailInput, emailError);
  }
});

subjectInput.addEventListener("input", (e) => {
  e.preventDefault();

  const subject = subjectInput.value.trim();

  if (subject.length < 2) {
    subjectInput.setAttribute("aria-invalid", "true");
    subjectError.textContent = "Subject field must have at least 2 characters.";
  } else {
    removeError(subjectInput, subjectError);
  }
});

messageInput.addEventListener("input", (e) => {
  e.preventDefault();

  const message = messageInput.value.trim();

  if (message.length < 10) {
    messageInput.setAttribute("aria-invalid", "true");
    messageError.textContent =
      "Message field must have at least 10 characters.";
  } else {
    removeError(messageInput, messageError);
  }
});

function removeError(field1, field2) {
  field1.removeAttribute("aria-invalid");
  field2.textContent = "";
}

// Functionality for success toast
const toast = document.querySelector(".toast");

function createToastNode() {
  const toast = document.createElement("div");
  toast.className = "toast enter";
  toast.setAttribute("data-testid", "test-contact-success")

  const toastMsg = document.createElement("p");
  toastMsg.textContent = "Message was successfully submitted.";
  toastMsg.className = "toast-message";

  const toastClose = document.createElement("span");
  toastClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  toastClose.className = "toast-close";

  toast.append(toastMsg);
  toast.append(toastClose);

  toastClose.addEventListener("click", () => {
    removeToast(toast);
  });

  return toast;
}

function removeToast(toast) {
  // remove animation frame
  toast.classList.remove("enter");
  toast.classList.add("exit");
  // after exit animation remove from DOM
  toast.addEventListener(
    "animationend",
    () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    },
    { once: true }
  );
}
