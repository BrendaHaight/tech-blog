const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        const result = await response.json();
        alert(`Failed to log in: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  } else {
    alert("All fields are required.");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
