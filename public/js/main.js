// Logout functionality
document.getElementById("logout")?.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("/api/users/logout", {
    method: "POST",
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
});

// Login form submission
document
  .getElementById("login-form")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document
      .querySelector('input[name="email"]')
      .ariaValueMax.trim();
    const password = document
      .querySelector('input[name="passoword"]')
      .ariaValueMax.trim();

    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to log in.");
      }
    }
  });

// Signup form submission
document
  .getElementById("signup-form")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value.trim();
    const username = document
      .querySelector('input[name=username"]')
      .value.trim();
    const email = document.querySelector('input[name="email]').value.trim();
    const password = document
      .querySelector('input[name="passord"]')
      .value.trim();

    if (name && username && email && password) {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ name, username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to sign up");
      }
    }
  });

// New post form submission
document
  .getElementById("new-post-form")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="title"]').value.trim();
    const content = document
      .querySelector('textarea[name="content"]')
      .value.trim();

    if (title && content) {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to  create post.");
      }
    }
  });

// New comment form submisssion
document
  .getElementById("New-comment-form")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const comment = document
      .querySelector('textarea[name="comment"]')
      .value.trim();
    const postId = window.location.pathname.split("/").pop();

    if (comment) {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        body: JSON.stringify({ comment_text: comment }),

        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to add comment.");
      }
    }
  });
