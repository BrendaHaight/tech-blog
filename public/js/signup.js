document.addEventListener("DOMContentLoaded", () => {
  const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    console.log("Sending data:", { username, email, password }); // Log data before sending

    if (username && email && password) {
      try {
        const response = await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/");
        } else {
          const result = await response.json();
          alert(`Failed to signup: ${result.message}`);
        }
      } catch (error) {
        console.error("Error during fetch:", error); // Log any fetch errors
      }
    } else {
      alert("All fields are required.");
    }
  };

  const signupForm = document.querySelector(".signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", signupFormHandler);
  }
});
