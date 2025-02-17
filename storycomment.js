// storycomment.js

function toggleCommentSection(sectionId) {
    const commentSection = document.getElementById(sectionId);
    commentSection.classList.toggle('show');
    const overlay = document.getElementById('comment-overlay');
    overlay.style.display = commentSection.classList.contains('show') ? 'block' : 'none';

    if (commentSection.classList.contains('show')) {
        setupSlideClose(commentSection);
    }
}

function closeCommentSections() {
    const commentSections = document.querySelectorAll('.comment-section.show');
    commentSections.forEach(section => {
        section.classList.remove('show');
    });
    document.getElementById('comment-overlay').style.display = 'none';
}

function setupSlideClose(commentSection) {
    let startY;

    commentSection.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    }, { once: true });

    commentSection.addEventListener('touchmove', function(event) {
        const currentY = event.touches[0].clientY;
        const diffY = currentY - startY;
        if (diffY > 50) {
            closeCommentSections();
        }
    }, { once: true });
}

function postComment(sectionId) {
    const commentSection = document.getElementById(sectionId);
    const textarea = commentSection.querySelector('textarea');
    const replyTo = textarea.dataset.replyTo;
    const commentsDiv = replyTo ? document.getElementById(`replies-${replyTo}`) : commentSection.querySelector('.comments');
    const commentText = textarea.value.trim();

    if (commentText) {
        const comment = document.createElement('div');
        comment.classList.add(replyTo ? 'comment-reply' : 'comment');
        comment.id = `comment-${Date.now()}`;

        const profilePicture = document.createElement('img');
        profilePicture.src = 'profile-picture.jpg'; // Replace with actual profile picture URL
        profilePicture.alt = 'Profile Picture';
        profilePicture.classList.add('profile-picture');

        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-content');

        const username = document.createElement('span');
        username.classList.add('username');
        username.textContent = 'Username'; // Replace with actual username

        const commentTextElement = document.createElement('p');
        commentTextElement.classList.add('comment-text');
        commentTextElement.textContent = commentText;

        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = formatTimeAgo(new Date());

        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = `<i class="fas fa-heart" onclick="toggleCommentLike(this)"></i> <span class="like-count">0</span>`;
        likeButton.style.display = "flex";
        likeButton.style.alignItems = "center";
        likeButton.style.justifyContent = "flex-end";

        const replyButton = document.createElement('span');
        replyButton.classList.add('reply-button');
        replyButton.textContent = 'Reply';
        replyButton.onclick = function () {
            setReplyTo(sectionId, comment.id);
        };

        commentContent.appendChild(username);
        commentContent.appendChild(commentTextElement);
        commentContent.appendChild(timestamp);
        comment.appendChild(profilePicture);
        comment.appendChild(commentContent);
        comment.appendChild(likeButton);

        if (!replyTo) {
            comment.appendChild(replyButton);
            const repliesDiv = document.createElement('div');
            repliesDiv.classList.add('replies');
            repliesDiv.id = `replies-${comment.id}`;

            const showRepliesButton = document.createElement('span');
            showRepliesButton.classList.add('show-replies-button');
            showRepliesButton.textContent = 'Show Replies';
            showRepliesButton.onclick = function () {
                toggleRepliesVisibility(repliesDiv.id);
            };

            comment.appendChild(showRepliesButton);
            comment.appendChild(repliesDiv);
        }

        commentsDiv.appendChild(comment);

        textarea.value = '';
        textarea.removeAttribute('data-reply-to');
    } else {
        alert('Please write a comment before posting.');
    }
}

function toggleRepliesVisibility(repliesId) {
    const repliesDiv = document.getElementById(repliesId);
    const showRepliesButton = repliesDiv.previousElementSibling;

    if (repliesDiv.style.display === 'none' || !repliesDiv.style.display) {
        repliesDiv.style.display = 'block';
        showRepliesButton.textContent = 'Hide Replies';
    } else {
        repliesDiv.style.display = 'none';
        showRepliesButton.textContent = 'Show Replies';
    }
}

function setReplyTo(sectionId, commentId) {
    const commentSection = document.getElementById(sectionId);
    const textarea = commentSection.querySelector('textarea');
    textarea.focus();
    textarea.dataset.replyTo = commentId;
}

function toggleCommentLike(element) {
    const likeButton = element.parentElement;
    const likeCountElement = likeButton.querySelector('.like-count');
    let count = parseInt(likeCountElement.textContent);

    element.classList.toggle('active');
    count = element.classList.contains('active') ? count + 1 : count - 1;
    likeCountElement.textContent = count;
}

function formatTimeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
        return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
    } else if (daysAgo === 1) {
        return `1 day ago`;
    } else {
        return `${daysAgo} days ago`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyEventListeners();
});
