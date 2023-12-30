let commentArray = [];

document
  .getElementById("comment_form")
  .addEventListener("submit", function (event) {
    
    event.preventDefault();
    
    const fullName = document.getElementById("full_name").value;
    const comments = document.getElementById("comments").value;

    if (fullName && comments) {
      const commentDate = new Date().getTime();

      const commentObj = {
        fullName,
        comment: comments,
        date: commentDate,
      };

      commentArray.push(commentObj);
      updateCommentList();
      document.getElementById("comment_form").reset();
    }
  });

document.getElementById("sort_button").addEventListener("click", function () {
  const sortOrder = document.getElementById("sort_comments").value;

  if (sortOrder === "newest") {
    commentArray.sort((a, b) => b.date - a.date);
  } else if (sortOrder === "oldest") {
    commentArray.sort((a, b) => a.date - b.date);
  }

  updateCommentList();
});

function updateCommentList() {
  const list = document.getElementById("comment_list");
  list.innerHTML = "";

  commentArray.forEach((comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = comment.fullName + ":";
    const p = document.createElement("p");
    p.textContent = comment.comment;
    const button = document.createElement("button");
    button.textContent = "Delete";

    button.addEventListener("click", function () {
      commentArray = commentArray.filter((c) => c.date !== comment.date);
      updateCommentList();
    });

    li.appendChild(span);
    li.appendChild(p);
    li.appendChild(button);
    list.appendChild(li);
  });
}
