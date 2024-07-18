const newPostHandler = async (event) => {
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
      alert("Failed to create post.");
    }
  }
};

const deletePostHandler = async (event) => {
  if (event.target.matches(".delete-post-btn")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post.");
    }
  }
};

document
  .querySelector("#new-post-form")
  ?.addEventListener("submit", newPostHandler);

document.querySelectorAll(".delete-post-btn")?.forEach((button) => {
  button.addEventListener("click", deletePostHandler);
});
