const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-body").value.trim();
  const post_id = window.location.toString().split("/").pop();

  console.log("Comment Text:", comment_text);
  console.log("Post ID:", post_id);

  if (comment_text && post_id) {
    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({ comment_text, post_id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Failed to add comment:", errorData);
        alert("Failed to add comment");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
