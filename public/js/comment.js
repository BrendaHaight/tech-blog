const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentText = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  const postId = window.location.toString().split("/").pop();
};
