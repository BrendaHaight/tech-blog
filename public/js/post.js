// New post form submission
document
  .getElementById("new-post-form")
  ?.addEventListener("submit", async (Event) => {
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
        alert("Failed to create a post.");
      }
    }
  });
