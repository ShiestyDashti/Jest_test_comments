function initializeCommentEnvironment() {
    const postButton = document.getElementById("post-btn");
    const inputElement = document.getElementById("input-comment");
    const commentSection = document.getElementById("comment-section");

    if (postButton && inputElement && commentSection) {
        postButton.addEventListener("click", () => {
            addComment(inputElement.value, commentSection);
            inputElement.value = ""; // Clear the input field
        });
    }
}

function addComment(commentText, commentSection) {
    if (commentText.trim() === "") return; // Do not add empty comments

    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.textContent = commentText;

    commentSection.appendChild(commentElement);
}

module.exports = { initializeCommentEnvironment, addComment };
